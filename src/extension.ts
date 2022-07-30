/*
 * @Descripttion: 神之一手
 * @version: 1.0.0
 * @Author: null
 * @Date: 2022-07-25 22:50:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-07-30 15:52:00
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require("path");
import * as fs from "fs/promises";
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
    vscode.commands.registerCommand("json2ts.ts", async () => {
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
      const cssPath = path.resolve(context.extensionPath, "build/css");
      const cssPaths = await fs.readdir(cssPath);
      const jsPath = path.resolve(context.extensionPath, "build/js");
      const jsPaths = await fs.readdir(jsPath);
      let cssLinks = ""; // 生成css的链接
      let jsLinks = ""; // 生成js的链接
      cssPaths.forEach((item) => {
        const css = vscode.Uri.file(
          path.join(context.extensionPath, "build/css", item)
        );
        cssLinks =
          cssLinks +
          ` <link href="${panel.webview.asWebviewUri(
            css
          )}" rel="stylesheet" />`;
      });
      jsPaths.forEach((item) => {
        const js = vscode.Uri.file(
          path.join(context.extensionPath, "build/js", item)
        );

        jsLinks =
          jsLinks +
          ` <script defer="defer" src="${panel.webview.asWebviewUri(
            js
          )}"></script>`;
      });
      vscode.window.showInformationMessage(
        JSON.stringify("webview open success")
      );
      // And set its HTML content
      panel.webview.html = getWebviewContent(cssLinks, jsLinks);
    })
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(customeEvent);
}
function getWebviewContent(css: any, jsLinks: string) {
  return `<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" href="favicon.ico" />
    <title>jsonto</title>
    ${jsLinks}
    ${css}
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
  </style>
</html>
`;
}
// this method is called when your extension is deactivated
export function deactivate() {}
