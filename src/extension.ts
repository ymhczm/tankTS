/*
 * @Descripttion: 神之一手
 * @version: 1.0.0
 * @Author: null
 * @Date: 2022-07-25 22:50:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-07-26 00:06:03
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
            vscode.Uri.file(path.join(context.extensionPath, "build")),
          ], // 为了引入本地资源设置资源的root位置
          enableScripts: true, // 启用JS，默认禁用
          retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置,
        }
      );
      const onCssApp = vscode.Uri.file(
        path.join(context.extensionPath, "build/css", "app.1243445b.css")
      );
      const onCssChunk = vscode.Uri.file(
        path.join(context.extensionPath, "build/css", "chunk-vendors.e6a9aef6")
      );
      const onJsApp = vscode.Uri.file(
        path.join(context.extensionPath, "build/js", "app.28ffb04f.js")
      );
      const onJsChunk = vscode.Uri.file(
        path.join(
          context.extensionPath,
          "build/js",
          "chunk-vendors.cce5f536.js"
        )
      );
      const cssApp = panel.webview.asWebviewUri(onCssApp);
      const cssChunk = panel.webview.asWebviewUri(onCssChunk);
      const jsApp = panel.webview.asWebviewUri(onJsApp);
      const jsChunk = panel.webview.asWebviewUri(onJsChunk);
      // And set its HTML content
      panel.webview.html = getWebviewContent(cssApp, cssChunk, jsApp, jsChunk);
    })
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(customeEvent);
}
function getWebviewContent(
  _cssApp: vscode.Uri,
  _cssChunk: vscode.Uri,
  _jsApp: vscode.Uri,
  _jsChunk: vscode.Uri
) {
  return `<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" href="favicon.ico" />
    <title>jsonto</title>
    <script defer="defer" src="${_jsChunk}"></script>
    <script defer="defer" src="${_jsApp}"></script>
    <link href="${_cssChunk}" rel="stylesheet" />
    <link href="${_cssApp}" rel="stylesheet" />
  </head>
  <body>
    <noscript
      ><strong
        >We're sorry but jsonto doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      ></noscript
    >
    <div id="app"></div>
  </body>
  <style>
    body {
      margin: 0;
      width: 100%;
      height: 100vh;
      box-sizing: border-box;
      padding: 20px 0;
      overflow: hidden;
    }
		.el-textarea__inner {
			width: 100%;
			color:rgb(96, 98, 102);
			padding: 5px 11px;
			box-sizing: border-box;
			line-height: 1.5;
			font-size 14px;
			background: white;
		}
		.is-disabled {
			background: rgb(245, 247, 250);
			color:rgb(96, 98, 102);
		}
		.el-button {
			height: 30px;
			width: 100px;
			text-align: center;
			background: rgb(64, 158, 255);
			color: #fff;
			border: none;
			margin-right: 10px;
		}
		.el-button--warning{
			background:rgb(230, 162, 60);
		}
  </style>
</html>
`;
}
// this method is called when your extension is deactivated
export function deactivate() {}
