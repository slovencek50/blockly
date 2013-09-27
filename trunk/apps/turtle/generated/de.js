// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">Visuelle Programmierumgebung</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Erzeugten JavaScript-Code ansehen.</span><span id="linkTooltip">Speichern und auf Bausteine verlinken.</span><span id="runTooltip">Das Programm ausführen, das von den Bausteinen \\nim Arbeitsbereich definiert ist. </span><span id="runProgram">Programm ausführen</span><span id="resetProgram">Zurücksetzen</span><span id="dialogOk">Okay</span><span id="dialogCancel">Abbrechen</span><span id="catLogic">Logik</span><span id="catLoops">Schleifen</span><span id="catMath">Mathematik</span><span id="catText">Text</span><span id="catLists">Listen</span><span id="catColour">Farbe</span><span id="catVariables">Variablen</span><span id="catProcedures">Funktionen</span><span id="httpRequestError">Mit der Anfrage gab es ein Problem.</span><span id="linkAlert">Teile deine Bausteine mit diesem Link:\n\n%1</span><span id="hashError">„%1“ stimmt leider mit keinem gespeicherten Programm überein.</span><span id="xmlError">Deine gespeicherte Datei konnte nicht geladen werden. Vielleicht wurde sie mit einer anderen Version von Blockly erstellt.</span><span id="listVariable">Liste</span><span id="textVariable">Text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">Okay</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Turtle_moveTooltip">Bewegt die Schildkröte um den angegebenen Wert \\nvorwärts oder rückwärts. </span><span id="Turtle_moveForward">vorwärts bewegen um</span><span id="Turtle_moveBackward">rückwärts bewegen um</span><span id="Turtle_turnTooltip">Dreht die Schildkröte nach links oder rechts um \\ndie angegebene Gradanzahl. </span><span id="Turtle_turnRight">nach rechts drehen um</span><span id="Turtle_turnLeft">nach links drehen um</span><span id="Turtle_widthTooltip">Ändert die Breite des Stiftes. </span><span id="Turtle_setWidth">Breite setzen auf</span><span id="Turtle_colourTooltip">Ändert die Farbe des Stiftes.</span><span id="Turtle_setColour">ändert die Farbe in</span><span id="Turtle_penTooltip">Hebt oder senkt den Stift zum Stoppen oder \\nStarten der Zeichnung. </span><span id="Turtle_penUp">Stift nach oben</span><span id="Turtle_penDown">Stift nach unten</span><span id="Turtle_turtleVisibilityTooltip">Macht die Schildkröte (Kreis und Pfeil) sichtbar \\noder unsichtbar. </span><span id="Turtle_hideTurtle">Schildkröte ausblenden</span><span id="Turtle_showTurtle">Schildkröte anzeigen</span><span id="Turtle_printHelpUrl">http://de.wikipedia.org/wiki/Buchdruck</span><span id="Turtle_printTooltip">Zeichnet Text in der Richtung der Schildkröte \\nbei ihrem Standort. </span><span id="Turtle_print">drucken</span><span id="Turtle_fontHelpUrl">http://de.wikipedia.org/wiki/Schriftschnitt</span><span id="Turtle_fontTooltip">Legt die Schriftart fest, die vom Druck-Baustein \\nverwendet wird. </span><span id="Turtle_font">Schriftart</span><span id="Turtle_fontSize">Schriftgröße</span><span id="Turtle_fontNormal">normal</span><span id="Turtle_fontBold">fett</span><span id="Turtle_fontItalic">kursiv</span><span id="Turtle_unloadWarning">Das Verlassen dieser Seite führt zum Verlust deiner Arbeit.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Turtle-Grafiken</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select></td></tr></table><div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><script type="text/javascript" src="../slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" title="Die Schildkröte macht das, was die Bausteine sagen."><img src="../../media/1x1.gif" class="run icon21">Programm ausführen</button><button id="resetButton" class="primary" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Zurücksetzen</button></td></tr></table><div id="toolbarDiv"><button id="codeButton" class="notext" title="Erzeugten JavaScript-Code ansehen."><img src=\'../../media/1x1.gif\' class="code icon21"></button><button id="linkButton" class="notext" title="Speichern und auf Bausteine verlinken."><img src=\'../../media/1x1.gif\' class="link icon21"></button><button class="notext" id="captureButton" title="Zeichnung speichern." onclick="Turtle.createImageLink();"><img src=\'../../media/1x1.gif\' class="img icon21"></button><a id="downloadImageLink" download="zeichnung.png"></a></div><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../blocks_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Schildkröte"><block type="draw_move"><value name="VALUE"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><title name="NUM">90</title></block></value></block><block type="draw_width"><value name="WIDTH"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="draw_pen"></block><block type="turtle_visibility"></block><block type="draw_print"><value name="TEXT"><block type="text"></block></value></block><block type="draw_font"></block></category><category name="Farbe"><block type="draw_colour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="Logik"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Schleifen"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Mathematik"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="Listen"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">Liste</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">Liste</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">Liste</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">Liste</title></block></value></block></category><category name="Variablen" custom="VARIABLE"></category><category name="Funktionen" custom="PROCEDURE"></category></xml>';
};
