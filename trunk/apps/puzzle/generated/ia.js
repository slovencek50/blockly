// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">un ambiente de programmation visual</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Vider le codice JavaScript generate.</span><span id="linkTooltip">Salveguardar e ligar a blocos. </span><span id="runTooltip">Executar le programma definite per le blocos in \\nle spatio de travalio. </span><span id="runProgram">Executar programma</span><span id="resetProgram">Reinitialisar</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logica</span><span id="catLoops">Buclas</span><span id="catMath">Mathematica</span><span id="catText">Texto</span><span id="catLists">Listas</span><span id="catColour">Color</span><span id="catVariables">Variabiles</span><span id="catProcedures">Proceduras</span><span id="httpRequestError">Il habeva un problema con le requesta.</span><span id="linkAlert">Divide tu blocos con iste ligamine:\n\n%1</span><span id="hashError">Infelicemente, \'%1\' non corresponde a alcun programma salveguardate.</span><span id="xmlError">Impossibile cargar le file salveguardate. Pote esser que illo ha essite create con un altere version de Blockly?</span><span id="listVariable">lista</span><span id="textVariable">texto</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="Puzzle_country1">Australia</span><span id="Puzzle_country1Flag">flag_au.png</span><span id="Puzzle_country1FlagHeight">50</span><span id="Puzzle_country1FlagWidth">100</span><span id="Puzzle_country1Language">Anglese</span><span id="Puzzle_country1City1">Melbourne</span><span id="Puzzle_country1City2">Sydney</span><span id="Puzzle_country1HelpUrl">http://ia.wikipedia.org/wiki/Australia</span><span id="Puzzle_country2">Germania</span><span id="Puzzle_country2Flag">flag_de.png</span><span id="Puzzle_country2FlagHeight">60</span><span id="Puzzle_country2FlagWidth">100</span><span id="Puzzle_country2Language">Germano</span><span id="Puzzle_country2City1">Berlin</span><span id="Puzzle_country2City2">Munich</span><span id="Puzzle_country2HelpUrl">http://ia.wikipedia.org/wiki/Germania</span><span id="Puzzle_country3">China</span><span id="Puzzle_country3Flag">flag_cn.png</span><span id="Puzzle_country3FlagHeight">66</span><span id="Puzzle_country3FlagWidth">100</span><span id="Puzzle_country3Language">Chinese</span><span id="Puzzle_country3City1">Peking</span><span id="Puzzle_country3City2">Shanghai</span><span id="Puzzle_country3HelpUrl">http://ia.wikipedia.org/wiki/China</span><span id="Puzzle_country4">Brasil</span><span id="Puzzle_country4Flag">flag_br.png</span><span id="Puzzle_country4FlagHeight">70</span><span id="Puzzle_country4FlagWidth">100</span><span id="Puzzle_country4Language">Portugese</span><span id="Puzzle_country4City1">Rio de Janeiro</span><span id="Puzzle_country4City2">São Paulo</span><span id="Puzzle_country4HelpUrl">http://ia.wikipedia.org/wiki/Brasil</span><span id="Puzzle_flag">bandiera:</span><span id="Puzzle_language">lingua:</span><span id="Puzzle_languageChoose">selige...</span><span id="Puzzle_cities">citates:</span><span id="Puzzle_error0">Perfecte!\nTote le %1 blocos es correcte.</span><span id="Puzzle_error1">Quasi! Un bloco es incorrecte.</span><span id="Puzzle_error2">%1 blocos es incorrecte.</span><span id="Puzzle_tryAgain">Le bloco marcate non es correcte.\nFace un altere essayo.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Puzzle</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Adjuta</button>&nbsp; &nbsp;<button id="checkButton" class="primary" onclick="Puzzle.checkAnswers();">Verificar responsas</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="help" class="dialogHiddenContent"><div style="padding-bottom: 0.7ex">Pro cata pais (in verde), attacha su bandiera, selige su lingua, e face un pila de su citates.</div><iframe style="height: 200px; width: 100%; border: none;" src="readonly.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&xml=%3Cblock+type%3D%22country%22+x%3D%225%22+y%3D%225%22%3E%3Cmutation+country%3D%221%22%3E%3C%2Fmutation%3E%3Ctitle+name%3D%22LANG%22%3E1%3C%2Ftitle%3E%3Cvalue+name%3D%22FLAG%22%3E%3Cblock+type%3D%22flag%22%3E%3Cmutation+country%3D%221%22%3E%3C%2Fmutation%3E%3C%2Fblock%3E%3C%2Fvalue%3E%3Cstatement+name%3D%22CITIES%22%3E%3Cblock+type%3D%22city%22%3E%3Cmutation+country%3D%221%22+city%3D%222%22%3E%3C%2Fmutation%3E%3Cnext%3E%3Cblock+type%3D%22city%22%3E%3Cmutation+country%3D%221%22+city%3D%221%22%3E%3C%2Fmutation%3E%3C%2Fblock%3E%3C%2Fnext%3E%3C%2Fblock%3E%3C%2Fstatement%3E%3C%2Fblock%3E"></iframe>' + apps.ok(null, null, opt_ijData) + '</div><div id="answers" class="dialogHiddenContent"><div id="answerMessage"></div><div id="graph"><div id="graphValue"></div></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


puzzlepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};
