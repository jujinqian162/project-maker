// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { prototype } from 'mocha';
import path from 'path';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

const main_func = `

int main()
{

    return 0;
}
`
var cpp_standered: string;

const window = vscode.window;

const debbug = false;

function windlog(str : string){
	if (debbug)
	vscode.window.showInformationMessage(str);
}
function winderr(str : string){
	vscode.window.showErrorMessage(str);
}


async function select_project_type(){
	let plist = ['CMake','QT', 'Normal'];
	return await _select(plist);	
}

async function select_lan_type() {
	return await _select(["c++", "c"]);
}
async function _select(list : string[]){
	let str = await window.showQuickPick(list);
	return str;
}
function add_mainFile(fspath : string, usecpp : boolean){
	let mfp;
	if (usecpp)
	mfp = path.join(fspath, "main.cpp");
	else 
	mfp = path.join(fspath, 'main.c');
	vscode.workspace.fs.writeFile(vscode.Uri.file(mfp), Buffer.from(main_func));
}

function make_project_cmake(fspath: string, use_cpp : boolean){

	const CMakeLists_txt_cpp = 
`cmake_minimum_required(VERSION 3.29.0)

set(CXX_STANDARD ${cpp_standered})
add_compile_options(-std=c++${cpp_standered})
project(main)

include_directories($ENV{INCLUDE})
link_directories($ENV{LIBPATH})


add_executable(\${PROJECT_NAME} main.cpp)
target_link_libraries(\${PROJECT_NAME} \${LIB})`
	
	const CMakeLists_txt_c = 
`cmake_minimum_required(VERSION 3.29.0)

project(main)

include_directories($ENV{INCLUDE})
link_directories($ENV{LIBPATH})

add_executable(\${PROJECT_NAME} main.c)
target_link_libraries(\${PROJECT_NAME} \${LIB})`
	

	const fs =  vscode.workspace.fs;
	if (!fs) return;

	const cname = "CMakeLists.txt";
	let cfp = path.join(fspath, cname);
	let ffp = path.join(fspath, "build");
	if (use_cpp){
		fs.writeFile(vscode.Uri.file(cfp), Buffer.from(CMakeLists_txt_cpp));
	}	else {
		fs.writeFile(vscode.Uri.file(cfp), Buffer.from(CMakeLists_txt_c));
	}
	add_mainFile(fspath, use_cpp);
	fs.createDirectory(vscode.Uri.file(ffp));
}

export function activate(context: vscode.ExtensionContext) {
	const Folders = vscode.workspace.workspaceFolders;
	if (!Folders){
		winderr('open a workspace folder');
		return;
	}
	let WFolder = Folders[0];

	const disposable = vscode.commands.registerCommand('project-maker.makeproject', async () => {
		const lan = await select_lan_type();
		if (lan == "c++"){
			

			windlog("select c++");
			const pro_type = await select_project_type();
			switch (pro_type) {
				case "CMake":
					windlog("CMake Project");
					const st = await _select(["20", "23", "26"]);
					if (st){
						windlog(st);
						cpp_standered = st;
					} else cpp_standered = "17";
					make_project_cmake(WFolder.uri.fsPath, true);
					break;
				case "QT":
					winderr("qt not finish develop");
				case "Normal":
					windlog('normal project');
					add_mainFile(WFolder.uri.fsPath, true);

				default:
					break;
			}
		
		}
		else if (lan == "c"){
			windlog("select c");
			const pro_type = await _select(["CMake", "Normal"]);
			switch (pro_type) {
				case "CMake":
					windlog("CMake Project");	
					make_project_cmake(WFolder.uri.fsPath, false);
					break;
				case "Normal":
					windlog('normal project');
					add_mainFile(WFolder.uri.fsPath, false);
				default:
					break;
			}
		}



	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
