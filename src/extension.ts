// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { prototype } from 'mocha';
import path from 'path';
import * as vscode from 'vscode';
import { QuickPickItem } from 'vscode';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
var use_clang_format : boolean;

const clang_format =
`
---
Language:        Cpp
# BasedOnStyle:  LLVM
# IndentWidth: 4
AccessModifierOffset: -4
AlignAfterOpenBracket: Align
AlignArrayOfStructures: Right
AlignConsecutiveMacros: AcrossComments
AlignConsecutiveAssignments: None
AlignConsecutiveBitFields: None
AlignConsecutiveDeclarations: None
AlignEscapedNewlines: Right
AlignOperands:   Align
AlignTrailingComments: true
AllowAllArgumentsOnNextLine: true
AllowAllParametersOfDeclarationOnNextLine: true
AllowShortEnumsOnASingleLine: true
AllowShortBlocksOnASingleLine: Empty
AllowShortCaseLabelsOnASingleLine: false
AllowShortFunctionsOnASingleLine: Empty
AllowShortLambdasOnASingleLine: Inline
AllowShortIfStatementsOnASingleLine: Never
AllowShortLoopsOnASingleLine: false
AlwaysBreakAfterDefinitionReturnType: None
AlwaysBreakAfterReturnType: None
AlwaysBreakBeforeMultilineStrings: false

AlwaysBreakTemplateDeclarations: true

AttributeMacros:
  - __capability
BinPackArguments: true
BinPackParameters: true
BraceWrapping:
  AfterCaseLabel:  false
  AfterClass:      false
  AfterControlStatement: Never
  AfterEnum:       false
  AfterFunction:   false
  AfterNamespace:  false
  AfterObjCDeclaration: false
  AfterStruct:     false
  AfterUnion:      false
  AfterExternBlock: false
  BeforeCatch:     false
  BeforeElse:      false
  BeforeLambdaBody: false
  BeforeWhile:     false
  IndentBraces:    false
  SplitEmptyFunction: true
  SplitEmptyRecord: true
  SplitEmptyNamespace: true
BreakBeforeBinaryOperators: None
BreakBeforeConceptDeclarations: true
BreakBeforeBraces: Attach
BreakBeforeInheritanceComma: false
BreakInheritanceList: BeforeColon
BreakBeforeTernaryOperators: true
BreakConstructorInitializersBeforeComma: false
BreakConstructorInitializers: BeforeColon
BreakAfterJavaFieldAnnotations: false
BreakStringLiterals: true
ColumnLimit:     80
CommentPragmas:  '^ IWYU pragma:'
QualifierAlignment: Leave
CompactNamespaces: false
ConstructorInitializerIndentWidth: 4
ContinuationIndentWidth: 4

Cpp11BracedListStyle: false

DeriveLineEnding: true
DerivePointerAlignment: false
DisableFormat:   false
EmptyLineAfterAccessModifier: Never

EmptyLineBeforeAccessModifier: Always

ExperimentalAutoDetectBinPacking: false
PackConstructorInitializers: BinPack
BasedOnStyle:    ''
ConstructorInitializerAllOnOneLineOrOnePerLine: false
AllowAllConstructorInitializersOnNextLine: true
FixNamespaceComments: true
ForEachMacros:
  - foreach
  - Q_FOREACH
  - BOOST_FOREACH
IfMacros:
  - KJ_IF_MAYBE
IncludeBlocks:   Preserve
IncludeCategories:
  - Regex:           '^"(llvm|llvm-c|clang|clang-c)/'
    Priority:        2
    SortPriority:    0
    CaseSensitive:   false
  - Regex:           '^(<|"(gtest|gmock|isl|json)/)'
    Priority:        3
    SortPriority:    0
    CaseSensitive:   false
  - Regex:           '.*'
    Priority:        1
    SortPriority:    0
    CaseSensitive:   false
IncludeIsMainRegex: '(Test)?$'
IncludeIsMainSourceRegex: ''
IndentAccessModifiers: false
IndentCaseLabels: false
IndentCaseBlocks: false
IndentGotoLabels: true

IndentPPDirectives: BeforeHash

IndentExternBlock: AfterExternBlock
IndentRequires:  false
IndentWidth:     4
IndentWrappedFunctionNames: false
InsertTrailingCommas: None
JavaScriptQuotes: Leave
JavaScriptWrapImports: true
KeepEmptyLinesAtTheStartOfBlocks: true
LambdaBodyIndentation: Signature
MacroBlockBegin: ''
MacroBlockEnd:   ''
MaxEmptyLinesToKeep: 1
NamespaceIndentation: None
ObjCBinPackProtocolList: Auto
ObjCBlockIndentWidth: 2
ObjCBreakBeforeNestedBlockParam: true
ObjCSpaceAfterProperty: false
ObjCSpaceBeforeProtocolList: true
PenaltyBreakAssignment: 2
PenaltyBreakBeforeFirstCallParameter: 19
PenaltyBreakComment: 300
PenaltyBreakFirstLessLess: 120
PenaltyBreakOpenParenthesis: 0
PenaltyBreakString: 1000
PenaltyBreakTemplateDeclaration: 10
PenaltyExcessCharacter: 1000000
PenaltyReturnTypeOnItsOwnLine: 60
PenaltyIndentedWhitespace: 0
PointerAlignment: Right
PPIndentWidth:   -1
ReferenceAlignment: Pointer
ReflowComments:  true
RemoveBracesLLVM: false
SeparateDefinitionBlocks: Leave
ShortNamespaceLines: 1
SortIncludes:    CaseSensitive
SortJavaStaticImport: Before
SortUsingDeclarations: true
SpaceAfterCStyleCast: false
SpaceAfterLogicalNot: false
SpaceAfterTemplateKeyword: true
SpaceBeforeAssignmentOperators: true
SpaceBeforeCaseColon: false
SpaceBeforeCpp11BracedList: false
SpaceBeforeCtorInitializerColon: true
SpaceBeforeInheritanceColon: true
SpaceBeforeParens: ControlStatements
SpaceBeforeParensOptions:
  AfterControlStatements: true
  AfterForeachMacros: true
  AfterFunctionDefinitionName: false
  AfterFunctionDeclarationName: false
  AfterIfMacros:   true
  AfterOverloadedOperator: false
  BeforeNonEmptyParentheses: false
SpaceAroundPointerQualifiers: Default
SpaceBeforeRangeBasedForLoopColon: true
SpaceInEmptyBlock: false
SpaceInEmptyParentheses: false
SpacesBeforeTrailingComments: 1
SpacesInAngles:  Never
SpacesInConditionalStatement: false
SpacesInContainerLiterals: true
SpacesInCStyleCastParentheses: false
SpacesInLineCommentPrefix:
  Minimum:         1
  Maximum:         -1
SpacesInParentheses: false
SpacesInSquareBrackets: false
SpaceBeforeSquareBrackets: false
BitFieldColonSpacing: Both
Standard:        Latest
StatementAttributeLikeMacros:
  - Q_EMIT
StatementMacros:
  - Q_UNUSED
  - QT_REQUIRE_VERSION
TabWidth:        4
UseCRLF:         false
UseTab:          Always
WhitespaceSensitiveMacros:
  - STRINGIZE
  - PP_STRINGIZE
  - BOOST_PP_STRINGIZE
  - NS_SWIFT_NAME
  - CF_SWIFT_NAME
...
`



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
	//clang format add
	

	if (use_cpp){
		fs.writeFile(vscode.Uri.file(cfp), Buffer.from(CMakeLists_txt_cpp));
	}	else {
		fs.writeFile(vscode.Uri.file(cfp), Buffer.from(CMakeLists_txt_c));
	}
	add_mainFile(fspath, use_cpp);
	if (use_clang_format)
		add_clang_fomat(fspath);
	fs.createDirectory(vscode.Uri.file(ffp));
}

function add_clang_fomat(fspath : string){
	let fmt = path.join(fspath, '.clang-format');
	vscode.workspace.fs.writeFile(vscode.Uri.file(fmt), Buffer.from(clang_format));
}

async function select_fmt(){
	return await _select(['use clang format', 'dont use clang format']);
}


export function activate(context: vscode.ExtensionContext) {
	const Folders = vscode.workspace.workspaceFolders;
	if (!Folders){
		winderr('open a workspace folder');
		return;
	}
	let WFolder = Folders[0];

	const disposable = vscode.commands.registerCommand('project-maker.makeproject', async () => {
		const fmt = await select_fmt();
		if (fmt == "use clang format"){
			use_clang_format = true;
		} else {
			use_clang_format = false;
		}

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
					if (use_clang_format)
						add_clang_fomat(WFolder.uri.fsPath);
				default:
					winderr("no such type");
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
					if (use_clang_format)
						add_clang_fomat(WFolder.uri.fsPath);
				default:
					winderr("no such type");
			}
		}



	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
