class Message {
    constructor(content) {
        this.timeStamp = new Date();
        this.content = content;
    }

    getFormattedTimestamp() {
        return  "Message sent on: " + 
                this.timeStamp.getDate() + "/" +
                (this.timeStamp.getMonth() + 1) + "/" +
                this.timeStamp.getFullYear() + " @ " +
                this.timeStamp.getHours() + ":" +
                this.timeStamp.getMinutes() + ":" +
                this.timeStamp.getSeconds();
    }
}