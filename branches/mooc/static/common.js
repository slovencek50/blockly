/**
 * Blockly Apps: Common code
 *
 * Copyright 2013 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Common support code for Blockly apps.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

var BlocklyApps = {};

// The following properties get their non-default values set by the
// application.

/**
 * The page number, or a false value if the app doesn't use pages.
 * @type {number}
 */
BlocklyApps.PAGE = undefined;

/**
 * The current level.
 * @type {number}
 */
BlocklyApps.LEVEL = undefined;

/**
 * The maximum level for the current page for the current application.
 * @type {number}
 */
BlocklyApps.MAX_LEVEL = undefined;

/**
 * The application-dependent skin identifier.
 * @type {number}
 */
BlocklyApps.SKIN_ID = undefined;

/**
 * Languages supported by the application.  Keys should be in ISO 639 format.
 * @type {!Array.<!Array.<string>>}
 */
BlocklyApps.LANGUAGES = {
  // Format: ['Language name', 'direction', 'XX_compressed.js']
  'en_us': ['English', 'ltr', 'en_us_compressed.js']
};

/**
 * User's language, e.g., "en".
 * @type {string}
 */
BlocklyApps.LANG = undefined;

/**
 * The number of feedback versions for each missing block error message.
 * While this could vary by page/level, it generally does not.
 * @type {number}
 */
BlocklyApps.MAX_FEEDBACK_VERSIONS = undefined;

/**
 * The ideal number of blocks to solve this level.  Users only get 2
 * stars if they use more than this number.
 * @type {?number}
 */
BlocklyApps.IDEAL_BLOCK_NUM = undefined;

/**
 * An array of strings that must be found in the generated code.
 * These strings also are used for generating error names.
 * @type {Array.<string>}
 */
BlocklyApps.REQUIRED_BLOCKS = undefined;

/**
 * String or regular expression matching blocks that should not be counted
 * toward the block count.  This is used for colour blocks in the turtle
 * application.  While it could vary by page/level, it generally does not.
 * @type {string|Object}
 */
BlocklyApps.FREE_BLOCKS = undefined;

/**
 * Counter of the number of times the user has tried to solve the level.
 * @type {number}
 */
BlocklyApps.attempts = 0;

/**
 * Flag indicating whether the last program run completed the level.
 * @type {?boolean}
 */
BlocklyApps.levelComplete = null;

/**
 * Transcript of user's actions.  The format is application-dependent.
 * @type {Array.<Array>}
 */
BlocklyApps.log = null;

/**
 * The number of steps remaining before the currently running program
 * is deemed to be in an infinite loop and terminated.
 * @type {?number}
 */
BlocklyApps.ticks = null;

/**
 * Reset the playing field to the start position and kill any pending
 * animation tasks.  This will benerally be replaced by an application.
 * @param {boolean} first True if an opening animation is to be played.
 */
BlocklyApps.reset = function(first) {};

/**
 * Pseudo-random identifier used for tracking user progress within a level.
 */
BlocklyApps.LEVEL_ID = Math.random();

/**
 * Enumeration of test results.
 * BlocklyApps.getTestResults() runs checks in the below order.
 */
BlocklyApps.TestResults = {
  EMPTY_BLOCK_FAIL: 1,       // 0 stars.
  MISSING_BLOCK_FAIL: 2,     // 1 star.
  TOO_FEW_BLOCKS_FAIL: 3,    // 0 stars.
  LEVEL_INCOMPLETE_FAIL: 4,  // 0 stars.
  TOO_MANY_BLOCKS_FAIL: 5,   // 2 stars.
  OTHER_1_STAR_FAIL: 6,      // Application-specific 1-star failure.
  OTHER_2_STAR_FAIL: 7,      // Application-specific 2-star failure.
  ALL_PASS: 0                // 3 stars.
};

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
BlocklyApps.getStringParamFromUrl = function(name, defaultValue) {
  var val =
      window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1]) : defaultValue;
};

/**
 * Extracts a numeric parameter from the URL.
 * If the parameter is absent or less than min_value, min_value is
 * returned.  If it is greater than max_value, max_value is returned.
 * @param {string} name The name of the parameter.
 * @param {number} minValue The minimum legal value.
 * @param {number} maxValue The maximum legal value.
 * @return {number} A number in the range [min_value, max_value].
 */
BlocklyApps.getNumberParamFromUrl = function(name, minValue, maxValue) {
  var val = Number(BlocklyApps.getStringParamFromUrl(name, 'NaN'));
  return isNaN(val) ? minValue : Math.min(Math.max(minValue, val), maxValue);
};

/**
 * Use a series of heuristics that determine the likely language of this user.
 * Use a session cookie to load/save the language preference.
 * @return {string} User's language.
 * @throws {string} If no languages exist in this app.
 */
BlocklyApps.getLang = function() {
  // First choice: The URL specified language.
  var lang = BlocklyApps.getStringParamFromUrl('lang', '');
  if (BlocklyApps.LANGUAGES[lang]) {
    // Save this explicit choice as cookie.
    // Use of a session cookie for saving language is explicitly permitted
    // in the EU's Cookie Consent Exemption policy.  Section 3.6:
    // http://ec.europa.eu/justice/data-protection/article-29/documentation/
    //   opinion-recommendation/files/2012/wp194_en.pdf
    document.cookie = 'lang=' + escape(lang) + '; path=/';
    return lang;
  }
  // Second choice: Language cookie.
  var cookie = document.cookie.match(/(^|;)\s*lang=(\w+)/);
  if (cookie) {
    lang = unescape(cookie[2]);
    if (BlocklyApps.LANGUAGES[lang]) {
      return lang;
    }
  }
  // Third choice: The browser's language.
  lang = navigator.language;
  if (BlocklyApps.LANGUAGES[lang]) {
    return lang;
  }
  // Fourth choice: English.
  lang = 'en_us';
  if (BlocklyApps.LANGUAGES[lang]) {
    return lang;
  }
  // Fifth choice: I'm feeling lucky.
  for (var lang in BlocklyApps.LANGUAGES) {
    return lang;
  }
  // Sixth choice: Die.
  throw 'No languages available.';
};

/**
 * Load the specified language file(s).
 * @param {!Array<string>} languageSrc Array of language files.
 */
BlocklyApps.loadLanguageScripts = function(languageSrc) {
  for (var x = 0; x < languageSrc.length; x++) {
    var file = languageSrc[x];
    if (file.match(/^(\w+\/)*\w+\.js$/)) {
      document.writeln('<script type="text/javascript" ' +
          'src="../' + file + '"><' + '/script>');
    } else {
      console.error('Illegal language file: ' + file);
    }
  }
};

/**
 * Common startup tasks for all apps.
 */
BlocklyApps.init = function() {
  // Set the page title with the content of the translated title.
  document.title = document.getElementById('title').textContent;

  // Set the HTML's language and direction.
  // document.dir fails in Mozilla, use document.body.parentNode.dir instead.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=151407
  var rtl = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';
  document.head.parentElement.setAttribute('dir',
      BlocklyApps.LANGUAGES[BlocklyApps.LANG][1]);
  document.head.parentElement.setAttribute('lang', BlocklyApps.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (var lang in BlocklyApps.LANGUAGES) {
    languages.push(BlocklyApps.LANGUAGES[lang].concat(lang));
  }
  var comp = function(a, b) {
    // Sort based on first argument ('English', 'Русский', '简体字', etc).
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  };
  languages.sort(comp);
  // Populate the language selection menu.
  var languageMenu = document.getElementById('languageMenu');
  languageMenu.options.length = 0;
  for (var i = 0; i < languages.length; i++) {
    var tuple = languages[i];
    var lang = tuple[tuple.length - 1];
    var option = new Option(tuple[0], lang);
    if (lang == BlocklyApps.LANG) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }

  // Disable the link button if page isn't backed by App Engine storage.
  var linkButton = document.getElementById('linkButton');
  if ('BlocklyStorage' in window) {
    BlocklyStorage.HTTPREQUEST_ERROR = BlocklyApps.getMsg('httpRequestError');
    BlocklyStorage.LINK_ALERT = BlocklyApps.getMsg('linkAlert');
    BlocklyStorage.HASH_ERROR = BlocklyApps.getMsg('hashError');
    BlocklyStorage.XML_ERROR = BlocklyApps.getMsg('xmlError');
    // Swap out the BlocklyStorage's alert() for a nicer dialog.
    // TODO in branch.
    //BlocklyStorage.alert = BlocklyApps.storageAlert;
  } else if (linkButton) {
    linkButton.className = 'disabled';
  }

  // Fixes viewport for small screens.
  var viewport = document.querySelector('meta[name="viewport"]');
  if (viewport && screen.availWidth < 725) {
    viewport.setAttribute('content',
        'width=725, initial-scale=.35, user-scalable=no');
  }
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
BlocklyApps.loadBlocks = function(defaultXml) {
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (window.sessionStorage.loadOnceBlocks) {
    // Language switching stores the blocks during the reload.
    var text = window.sessionStorage.loadOnceBlocks;
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(text);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 * Save the blocks and reload with a different language.
 */
BlocklyApps.changeLanguage = function() {
  // Store the blocks for the duration of the reload.
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var text = Blockly.Xml.domToText(xml);
  window.sessionStorage.loadOnceBlocks = text;

  var languageMenu = document.getElementById('languageMenu');
  var newLang = encodeURIComponent(
      languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + search;
};

/**
 * Updates the document's 'capacity' element's innerHTML with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from Blockly.mainWorkspace.remainingCapacity().
 */
BlocklyApps.updateCapacity = function() {
  var cap = Blockly.mainWorkspace.remainingCapacity();
  var p = document.getElementById('capacity');
  if (cap == Infinity) {
    p.style.display = 'none';
  } else {
    p.style.display = 'inline';
    if (cap == 0) {
      p.innerHTML = BlocklyApps.getMsg('capacity0');
    } else if (cap == 1) {
      p.innerHTML = BlocklyApps.getMsg('capacity1');
    } else {
      cap = Number(cap);
      p.innerHTML = BlocklyApps.getMsg('capacity2').replace('%1', cap);
    }
  }
};

/**
 * Highlight the block (or clear highlighting).
 * @param {?string} id ID of block that triggered this action.
 */
BlocklyApps.highlight = function(id) {
  if (id) {
    var m = id.match(/^block_id_(\d+)$/);
    if (m) {
      id = m[1];
    }
  }
  Blockly.mainWorkspace.highlightBlock(id);
};

/**
 * If the user has executed too many actions, we're probably in an infinite
 * loop.  Sadly I wasn't able to solve the Halting Problem.
 * @param {?string} opt_id ID of loop block to highlight.
 * @throws {Infinity} Throws an error to terminate the user's program.
 */
BlocklyApps.checkTimeout = function(opt_id) {
  if (opt_id) {
    BlocklyApps.log.push([null, opt_id]);
  }
  if (BlocklyApps.ticks-- < 0) {
    throw Infinity;
  }
};

/**
 * Convert the user's code to raw JavaScript.
 * @param {string} code Generated code.
 * @return {string} The code without serial numbers and timeout checks.
 */
BlocklyApps.stripCode = function(code) {
  // Strip out serial numbers.
  code = code.replace(/(,\s*)?'block_id_\d+'\)/g, ')');
  // Remove timeouts.
  var regex = new RegExp(Blockly.JavaScript.INFINITE_LOOP_TRAP
      .replace('(%1)', '\\((\'\\d+\')?\\)'), 'g');
  return code.replace(regex, '');
};

/**
 * Show the user's code in raw JavaScript.
 */
BlocklyApps.showCode = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  code = BlocklyApps.stripCode(code);
  window.alert(code);
};

// Methods for determining and displaying feedback.

/**
 * Display feedback based on test results.
 */
BlocklyApps.displayFeedback = function() {
  var feedbackType = BlocklyApps.getTestResults();
  BlocklyApps.setErrorFeedback(feedbackType);
  BlocklyApps.showDialogAndFeedback(feedbackType);
};

/**
 * Check user's code for empty top-level blocks e.g. 'repeat'.
 * @return {boolean} true if block is empty (no blocks are nested inside).
 */
BlocklyApps.hasEmptyTopLevelBlocks = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  code = BlocklyApps.stripCode(code);
  return /\{\s*\}/.test(code);
};

/**
 * Check whether the user code has all the blocks required for the level.
 * @return {boolean} true if all blocks are present, false otherwise.
 */
BlocklyApps.hasAllRequiredBlocks = function() {
  return BlocklyApps.getMissingRequiredBlocks().length == 0;
};

/**
 * Check to see if the user's code contains the required blocks for a level.
 * @return {!Array} array of strings where each string is a block type that is
 *   not present in the workspace/user's code.
 */
BlocklyApps.getMissingRequiredBlocks = function() {
  var missingBlocks = [];
  if (BlocklyApps.REQUIRED_BLOCKS) {
    // TODO: Eliminate disabled blocks and uneditable blocks.
    var text = Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    for (var i = 0; i < BlocklyApps.REQUIRED_BLOCKS.length; i++) {
      var blockType = BlocklyApps.REQUIRED_BLOCKS[i];
      var regex = new RegExp(blockType, 'g');
      if (!text.match(regex)) {
        missingBlocks.push(blockType);
      }
    }
  }
  return missingBlocks;
};

/**
 * Counts the number of blocks used.  Blocks are only counted if they are
 * deletable, not disabled, and not matched by the string or regular expression
 * BlocklyApps.FREE_BLOCKS.
 * @param {boolean} opt_undeletableFree true if undeletable blocks should not be counted
 * @return {number} Number of blocks used.
 */
BlocklyApps.getNumBlocksUsed = function(opt_undeletableFree) {
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  var count = 0;
  for (var i = 0; i < blocks.length; i++) {
    if (!blocks[i].disabled &&
        (!opt_undeletableFree || blocks[i].isDeletable()) &&
        (!BlocklyApps.FREE_BLOCKS ||
            !blocks[i].type.match(BlocklyApps.FREE_BLOCKS))) {
          count++;
    }
  }
  return count;
};

/**
 * Runs the tests and returns results.
 * @return {number} The appropriate property of BlocklyApps.TestResults.
 */
BlocklyApps.getTestResults = function() {
  if (BlocklyApps.hasEmptyTopLevelBlocks()) {
    return BlocklyApps.TestResults.EMPTY_BLOCK_FAIL;
  }
  if (!BlocklyApps.hasAllRequiredBlocks()) {
    return BlocklyApps.TestResults.MISSING_BLOCK_FAIL;
  }
  var numBlocksUsed = BlocklyApps.getNumBlocksUsed();
  if (!BlocklyApps.levelComplete) {
    if (BlocklyApps.IDEAL_BLOCK_NUM &&
        numBlocksUsed < BlocklyApps.IDEAL_BLOCK_NUM) {
      return BlocklyApps.TestResults.TOO_FEW_BLOCKS_FAIL;
    }
    return BlocklyApps.TestResults.LEVEL_INCOMPLETE_FAIL;
  }
  if (BlocklyApps.IDEAL_BLOCK_NUM &&
      numBlocksUsed > BlocklyApps.IDEAL_BLOCK_NUM) {
    return BlocklyApps.TestResults.TOO_MANY_BLOCKS_FAIL;
  } else {
    return BlocklyApps.TestResults.ALL_PASS;
  }
};

/**
 * Show stars based on the degree of completion and if the level is complete.
 * @param {number} testResult The number of stars to display.
 */
BlocklyApps.displayStars = function(testResult) {
  document.getElementById('star' + testResult).style.display = 'block';
};

/**
 * Sets appropriate feedback for when the modal dialog is displayed.
 * @param {number} feedbackType A constant property of BlocklyApps.TestResults,
 *     typically produced by BlocklyApps.getTestResults().
 */
BlocklyApps.setErrorFeedback = function(feedbackType) {
  var versionOfFeedback = Math.min(BlocklyApps.attempts,
                                   BlocklyApps.MAX_FEEDBACK_VERSIONS);
  switch (feedbackType) {
    // Give hint, not stars, for empty block or not finishing level.
    case BlocklyApps.TestResults.EMPTY_BLOCK_FAIL:
      document.getElementById('emptyBlocksError').style.display = 'list-item';
      document.getElementById('hintTitle').style.display = 'inline';
      break;
    case BlocklyApps.TestResults.TOO_FEW_BLOCKS_FAIL:
      document.getElementById('tooFewBlocksError').style.display = 'list-item';
      document.getElementById('hintTitle').style.display = 'inline';
      break;
    case BlocklyApps.TestResults.LEVEL_INCOMPLETE_FAIL:
      document.getElementById('levelIncompleteError').style.display =
          'list-item';
      document.getElementById('hintTitle').style.display = 'inline';
      break;
    case BlocklyApps.TestResults.OTHER_1_STAR_FAIL:
      document.getElementById('star1').style.display = 'block';
      document.getElementById('hintTitle').style.display = 'inline';
      break;

    // One star for failing to use required blocks.
    case BlocklyApps.TestResults.MISSING_BLOCK_FAIL:
      // For each error type in the array, display the corresponding error.
      var missingBlocks = BlocklyApps.getMissingRequiredBlocks();
      if (missingBlocks.length) {
        for (var e = 0; e < missingBlocks.length; e++) {
          var bError = missingBlocks[e];
          // Remove non-word characters, leaving only [a-zA-Z0-9_].
          bError = bError.replace(/\W/g, '');
          var blockErrorElement = document.getElementById(bError + 'Error' +
              versionOfFeedback);
          if (blockErrorElement) {
            blockErrorElement.style.display = 'list-item';
          }
        }
      }
      BlocklyApps.displayStars(1);
      break;

    // Two stars for using too many blocks.
    case BlocklyApps.TestResults.TOO_MANY_BLOCKS_FAIL:
      BlocklyApps.setTextForElement(
          'tooManyBlocksError',
          BlocklyApps.getMsg('numBlocksNeeded').replace(
              '%1', BlocklyApps.IDEAL_BLOCK_NUM).replace(
                  '%2', BlocklyApps.getNumBlocksUsed())).style.display =
                      'list-item';
      // Fall through...
    case BlocklyApps.TestResults.OTHER_2_STAR_FAIL:
      BlocklyApps.displayStars(2);
      break;

    // Three stars!
    case BlocklyApps.TestResults.ALL_PASS:
      BlocklyApps.displayStars(3);
      break;
  }
};

/**
 * Gets the message with the given key from the document.
 * @param {string} key The key of the document element.
 * @return {string} The innerHTML of the specified element,
 *     or an error message if the element was not found.
 */
BlocklyApps.getMsg = function(key) {
  var msg = BlocklyApps.getMsgOrNull(key);
  return msg ? msg : '[Unknown message: ' + key + ']';
};

/**
 * Gets the message with the given key from the document.
 * @param {string} key The key of the document element.
 * @return {string} The innerHTML of the specified element,
 *     or null if the element was not found.
 */
BlocklyApps.getMsgOrNull = function(key) {
  var element = document.getElementById(key);
  if (element) {
    var text = element.innerHTML;
    // Convert newline sequences.
    text = text.replace(/\\n/g, '\n');
    return text;
  } else {
    return null;
  }
};

/**
 * Where to report back information about the user program.
 */
BlocklyApps.REPORT_URL = '/report';

/**
 * Report back to the server, if available.
 * @param {string} app The name of the application.
 * @param {number} id A unique identifier generated when the page was loaded.
 * @param {number} level The current level of the application.
 * @param {number} result An indicator of the success of the code.
 * @param {string} program The user program, which will get URL-encoded.
 */
BlocklyApps.report = function(app, id, level, result, program) {
  if ('BlocklyStorage' in window) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', BlocklyApps.REPORT_URL);
    httpRequest.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');
    httpRequest.send('app=' + app +
        '&id=' + id +
        '&level=' + level +
        '&result=' + result +
        '&program=' + encodeURIComponent(program));
  }
};

/**
 * On touch enabled browsers, add touch-friendly variants of event handlers
 * for elements such as buttons whose event handlers are specified in the
 * markup. For example, ontouchend is treated as equivalent to onclick.
 */
BlocklyApps.addTouchEvents = function() {
  // Do nothing if the browser doesn't support touch.
  if (!('ontouchstart' in document.documentElement)) {
    return;
  }
  // Treat ontouchend as equivalent to onclick for buttons.
  var buttons = document.getElementsByTagName('button');
  for (var i = 0, button; button = buttons[i]; i++) {
    if (!button.ontouchend) {
      button.ontouchend = button.onclick;
    }
  }
};

/**
 * Show dialog at the end of a level and display feedback.
 * @param {number} feedbackType A constant property of BlocklyApps.TestResults.
 */
BlocklyApps.showDialogAndFeedback = function(feedbackType) {
  var feedbackColor;
  var feedbackText = document.getElementById('levelFeedbackText');

  if (feedbackType == BlocklyApps.TestResults.ALL_PASS) {
    feedbackColor = 'green';
    feedbackText.style.textAlign = 'center';
    if (BlocklyApps.LEVEL < BlocklyApps.MAX_LEVEL) {
      document.getElementById('nextLevelMsg').style.display = 'inline';
    } else {
      document.getElementById('finalLevelMsg').style.display = 'inline';
    }
    document.getElementById('continueButton').style.display = 'inline';
    document.getElementById('tryAgainButton').style.display = 'none';
  } else {
    feedbackColor = 'red';
    feedbackText.style.textAlign = 'left';
    document.getElementById('hintTitle').style.display = 'inline';
    document.getElementById('tryAgainButton').style.display = 'inline';
    if (feedbackType == BlocklyApps.TestResults.TOO_MANY_BLOCKS_FAIL ||
        feedbackType == BlocklyApps.TestResults.OTHER_2_STAR_FAIL) {
      document.getElementById('continueButton').style.display = 'inline';
    }
  }
  document.getElementById('shadow').style.display = 'block';
  document.getElementById('levelFeedback').style.display = 'block';
  feedbackText.style.display = 'block';
  feedbackText.style.color = feedbackColor;
};

/**
 * Hide end of level feedback.
 */
BlocklyApps.hideFeedback = function() {
  document.getElementById('levelFeedbackText').style.display = 'none';
  var feedbackArray = document.querySelectorAll('.feedback');
  for (var f = 0, feedback; feedback = feedbackArray[f]; f++) {
    feedback.style.display = 'none';
  }
  document.getElementById('tryAgainButton').style.display = 'none';
  document.getElementById('continueButton').style.display = 'none';
};

/**
 * Hide the modal dialog.
 */
BlocklyApps.hideDialog = function() {
  document.getElementById('shadow').style.display = 'none';
  document.getElementById('levelFeedback').style.display = 'none';
  BlocklyApps.hideFeedback();
};

/**
 * Show the help pop-up for reinf levels so we can set text appropriately.
 * @param {number} reinfLevel Level number the quiz is displayed on.
 * @param {string} identifier 'q' + reinforcement level number +
 *     'r' or 'w' (right or wrong answer).
 */
BlocklyApps.showReinfHelp = function(reinfLevel, identifier) {
  var qNum = reinfLevel;
  var responseType = identifier.charAt(identifier.length - 1);
  document.getElementById('reinfDone').style.display = 'block';
  var textColor;
  var responseType;
  if (responseType == 'w') {
    textColor = 'red';
    responseType = 'wrong';
  } else if (responseType == 'r') {
    textColor = 'green';
    responseType = 'right';
    document.getElementById('continueButton').removeAttribute('disabled');
  } else {
    throw 'Response not w or r.';
  }
  var textDiv = document.getElementById('reinfFeedbackText');
  textDiv.style.color = textColor;
  textDiv.value = BlocklyApps.getMsg('q' + qNum + responseType);
};

/**
 * @param {boolean} gotoNext true to continue to next level/interstitial,
 *     false to try level again.
 */
BlocklyApps.displayInterstitialOrCloseModalDialog = function(gotoNext) {
  if (gotoNext) {
    var element = document.getElementById('reinfMsg');
    if (element) {
      var reinfMsg = element.innerHTML.match(/\S/);
      var interstitial = document.getElementById('interstitial').style.display;
      if (reinfMsg && interstitial == 'none') {
        BlocklyApps.hideFeedback();
        if (document.querySelector('.quiz')) {
          document.getElementById('continueButton').setAttribute('disabled',
                                                               'disabled');
        } else {
          document.getElementById('reinfDone').style.display = 'none';
          document.getElementById('continueButton').style.display = 'inline';
        }
        document.getElementById('interstitial').style.display = 'block';
        document.getElementById('tryAgainButton').style.display = 'none';
        return;
      }
    }
    BlocklyApps.hideDialog();
    BlocklyApps.createURLAndOpenNextLevel();
  } else {
    BlocklyApps.hideDialog();
    BlocklyApps.resetButtonClick();
  }
};

/**
 * Construct the URL and go to the next level.
 */
BlocklyApps.createURLAndOpenNextLevel = function() {
  window.location = window.location.protocol + '//' +
    window.location.host + window.location.pathname +
    '?lang=' + BlocklyApps.LANG +
    (BlocklyApps.PAGE ? '&page=' + BlocklyApps.PAGE : '') +
    '&level=' + (BlocklyApps.LEVEL + 1) +
    // TODO: Fix hack used to temporarily keep turtle interstitials working.
    (BlocklyApps.SKIN_ID ? '&skin=' + BlocklyApps.SKIN_ID : '&reinf=1');
};

/**
 * Click the reset button.  Reset the application.
 */
BlocklyApps.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  Blockly.mainWorkspace.traceOn(false);
  BlocklyApps.reset(false);
};

/**
 * If there is an interstitial iframe, create a URL for the video stored in
 * Google Drive and add it as the iframe source.
 * @param {string} videoId A Google Drive video ID.
 */
BlocklyApps.addVideoIframeSrc = function(videoId) {
  var videoIframe = document.getElementById('interstitial')
      .getElementsByTagName('iframe')[0];
  if (videoIframe) {
    var videoUrl = 'https://docs.google.com/file/d/' + videoId + '/preview';
    videoIframe.src = videoUrl;
  }
};

/**
 * Place text in the specified element, if found.  This eliminates
 * any other children of the element and creates a child text node.
 * @param {string} id The identifier of the element.
 * @param {string} text The text to display.
 * @return {Object} The element.
 */
BlocklyApps.setTextForElement = function(id, text) {
  var element = document.getElementById(id);
  if (element) {
    element.innerHTML = '';  // Remove existing children or text.
    element.appendChild(document.createTextNode(text));
  }
  return element;
};


// Add events for touch devices when the window is done loading.
window.addEventListener('load', BlocklyApps.addTouchEvents, false);
