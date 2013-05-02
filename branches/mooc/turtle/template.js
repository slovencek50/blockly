// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<table width="100%" height="100%"><tr><td width="410" valign="top"><h1><a href="../">MOOC</a> &gt; ' + soy.$$escapeHtml(opt_ijData.MSG.title) + '</h1><p class="levelLine">' + soy.$$escapeHtml(opt_ijData.MSG.level) + ': &nbsp;';
  var iLimit8 = opt_ijData.maxLevel + 1;
  for (var i8 = 1; i8 < iLimit8; i8++) {
    output += (i8 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i8) + '</span>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i8) + '">' + soy.$$escapeHtml(i8) + '</a>';
  }
  output += '</p><div id="bubble"><div id="hint">' + soy.$$escapeHtml(opt_ijData.MSG.hints[opt_ijData.level]) + '</div></div><div id="capacity"></div><div><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="answer" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center"><script type="text/javascript" src="../../../trunk/apps/slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="launch" onclick="Turtle.runButtonClick();">' + soy.$$escapeHtml(opt_ijData.MSG.runProgram) + '</button><button id="resetButton" class="launch" onclick="Turtle.resetButtonClick();" style="display: none">' + soy.$$escapeHtml(opt_ijData.MSG.resetProgram) + '</button></td></tr></table><div id="toolbarDiv"><button title="' + soy.$$escapeHtml(opt_ijData.MSG.codeTooltip) + '" onclick="Turtle.showCode();"><img src=\'../../../trunk/media/1x1.gif\' class="code"></button><button id="linkButton" title="' + soy.$$escapeHtml(opt_ijData.MSG.linkTooltip) + '" onclick="BlocklyStorage.link();"><img src=\'../../../trunk/media/1x1.gif\' class="link"></button></div></td><td valign="top"><script type="text/javascript" src="../../../trunk/blockly_compressed.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript/control.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript/logic.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript/math.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript/lists.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript/colour.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript/variables.js"><\/script><script type="text/javascript" src="../../../trunk/generators/javascript/procedures.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">Blockly.Apps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script><script type="text/javascript" src="answers.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none">' + ((opt_ijData.level == 1) ? '<block type="draw_move_forward_100"></block><block type="draw_turn_right_90"></block>' : (opt_ijData.level == 2) ? '<block type="draw_move_forward_100"></block><block type="draw_turn_right_90"></block><block type="controls_repeat"><title name="TIMES">4</title></block>' : '<category name="' + soy.$$escapeHtml(opt_ijData.MSG.catTurtle) + '"><block type="draw_move"><value name="VALUE"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><title name="NUM">90</title></block></value></block><block type="draw_width"><value name="WIDTH"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="draw_pen"></block><block type="turtle_visibility"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catColour) + '"><block type="draw_colour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catControl) + '"><block type="controls_if"></block><block type="controls_repeat"></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catLogic) + '"><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catMath) + '"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catLists) + '"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">list</title></block></value></block></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catVariables) + '" custom="VARIABLE"></category><category name="' + soy.$$escapeHtml(opt_ijData.MSG.catProcedures) + '" custom="PROCEDURE"></category>') + '</xml>';
};
