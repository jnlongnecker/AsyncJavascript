import { LightningElement } from 'lwc';

export default class CallbackFunctions extends LightningElement {
    waitTime = 1000;
    showSpinner = false;

    errorMessage;
    displayErrorMessage = false;

    runExample(event) {
        // This method is in response for keydown and click events, so filter out the non-enter key events
        if (event.code && event.code != 'Enter') return;

        this.inputsBusy();
        this.waitTime = this.template.querySelector("input[type=number]").value;

        // A try block wraps around any code that might throw an exception
        try {
            this.callbackExample(this.waitTime);
            this.showSpinner = true;
        }
        // A try must always be follow by a catch to handle the caught exception
        catch (exception) {
            this.showErrorMessage(exception.message);
        }
    }

    callbackExample(time) {
        // When constructing a method that has to be used a specific way, be sure to throw an error for invalid inputs
        if (time < 0) throw new Error("Time must be positive");

        // Here, we're using an anonymous arrow function as a callback function. This will be run after the specified wait time
        setTimeout(() => {
            this.showSpinner = false;
        }, time);

        /* 
            Here, we are demonstrating the usage of a spinner to signify to the user that some action is occuring. We're using a callback function to
            hide that spinner when the action has completed. This is important for asynchronous code, because it takes a long time to resolve. We
            need to be sure that we are communicating to our users what is going on instead of displaying nothing.
        */
    }

    showErrorMessage(message) {
        this.displayErrorMessage = true;
        this.errorMessage = message;

        console.error(message);

        // We're using another anonymous callback function to hide the error message after 2 seconds (2000 milis)
        setTimeout(() => {
            this.errorMessage = "";
            this.displayErrorMessage = false;
        }, 2000);
    }

    // Used for accessibility to let aria users know when they should modify the inputs again
    inputsBusy() {
        let inputs = this.template.querySelectorAll("section *");
        for (let ele of inputs) {
            ele.setAttribute("aria-busy", "true");
        }
    }

    inputsReady() {
        let inputs = this.template.querySelectorAll("section *");
        for (let ele of inputs) {
            ele.setAttribute("aria-busy", "false");
        }
    }
}