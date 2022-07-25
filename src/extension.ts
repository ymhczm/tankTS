/*
 * @Descripttion: 神之一手
 * @version: 1.0.0
 * @Author: null
 * @Date: 2022-07-25 22:50:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-07-25 23:25:28
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require("path");
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "json2ts" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("json2ts.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from json2ts!");
  });
  let customeEvent = vscode.commands.registerCommand(
    "json2ts.helloVScpde",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("hello VScpdefrom json2ts!");
    }
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("json2ts.ts", () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        "ts2code",
        "ts2code",
        vscode.ViewColumn.One,
        {
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "imgs")),
          ],
        }
      );
      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, "imgs", "tt_family4.jpg")
      );
      const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
      // And set its HTML content
      panel.webview.html = getWebviewContent(catGifSrc);
    })
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(customeEvent);
}
function getWebviewContent(value: vscode.Uri) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="${value}" width="300" />
</body>
</html>`;
}
// this method is called when your extension is deactivated
export function deactivate() {}
