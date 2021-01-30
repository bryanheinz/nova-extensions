const notify = body => {
    let request = new NotificationRequest("Executive");
    request.title = nova.localize("Make Executable");
    request.body = nova.localize(body);
    let promise = nova.notifications.add(request);
}


nova.commands.register("executive.make", (workspace) => {
    try {
        const currentFile = workspace.activeTextEditor.document.path;
        const cliArgs = ["+x", currentFile];
        let task = new Process('/bin/chmod', {
            args: cliArgs
        });
        task.onDidExit(function(status) {
            console.log(`Marked ${currentFile} as executable: ${status}`);
        });
        task.start();
    } catch (err) {
        console.log(`Error getting path to document: ${err}`);
        notify("Couldn't find path to the document.");
    }
});
