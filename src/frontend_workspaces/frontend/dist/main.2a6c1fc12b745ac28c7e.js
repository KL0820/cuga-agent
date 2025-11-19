/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../agentic_chat/src/App.tsx":
/*!***********************************!*\
  !*** ../agentic_chat/src/App.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: function() { return /* binding */ App; },
/* harmony export */   BootstrapAgentic: function() { return /* binding */ BootstrapAgentic; }
/* harmony export */ });
/* harmony import */ var _carbon_ai_chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @carbon/ai-chat */ "../node_modules/.pnpm/@carbon+ai-chat@0.5.1_@carbon+icon-helpers@10.65.0_@carbon+icons@11.66.0_@carbon+react@_b713c759c00ec96d0998973803a1d794/node_modules/@carbon/ai-chat/dist/es/aiChatEntry.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/client */ "../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/client.js");
/* harmony import */ var _customSendMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customSendMessage */ "../agentic_chat/src/customSendMessage.ts");
/* harmony import */ var _renderUserDefinedResponse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderUserDefinedResponse */ "../agentic_chat/src/renderUserDefinedResponse.tsx");
/* harmony import */ var _floating_stop_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./floating/stop_button */ "../agentic_chat/src/floating/stop_button.tsx");

 // React declaration MUST be here


// These functions hook up to your back-end.

// This function returns a React component for user defined responses.


function App() {
  const chatConfig = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    headerConfig: {
      hideMinimizeButton: true,
      showRestartButton: true
    },
    debug: true,
    layout: {
      showFrame: false
    },
    openChatByDefault: true,
    messaging: {
      customSendMessage: _customSendMessage__WEBPACK_IMPORTED_MODULE_3__.customSendMessage
    }
  }), []);
  function onBeforeRender(instance) {
    // Handle feedback event.
    instance.on({
      type: "FEEDBACK",
      handler: feedbackHandler
    });
    instance.on({
      type: "pre:restartConversation",
      handler: restartConversationHandler
    });
  }

  /**
   * Handles when the user submits feedback.
   */
  function feedbackHandler(event) {
    if (event.interactionType === "SUBMITTED") {
      const {
        message,
        messageItem,
        ...reportData
      } = event;
      setTimeout(() => {
        // eslint-disable-next-line no-alert
        window.alert(JSON.stringify(reportData, null, 2));
      });
    }
  }
  async function restartConversationHandler(_event) {
    console.log("Restarting conversation");
    try {
      // Call the backend reset endpoint
      const response = await fetch('/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Backend reset successful:", result.message);
      } else {
        console.error("Backend reset failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error calling reset endpoint:", error);
    }

    // Reset the CardManager state
    (0,_renderUserDefinedResponse__WEBPACK_IMPORTED_MODULE_4__.resetCardManagerState)();

    // Reset the CardManager through the global interface if available
    if (typeof window !== "undefined" && window.aiSystemInterface) {
      console.log("Resetting CardManager through global interface");
      window.aiSystemInterface.forceReset();
    }
  }
  const renderWriteableElements = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    beforeInputElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_floating_stop_button__WEBPACK_IMPORTED_MODULE_5__.StopButton, {
      location: "sidebar"
    })
  }), []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_carbon_ai_chat__WEBPACK_IMPORTED_MODULE_0__.ChatCustomElement, {
    config: chatConfig,
    className: "fullScreen",
    renderWriteableElements: renderWriteableElements,
    onBeforeRender: onBeforeRender,
    renderUserDefinedResponse: _renderUserDefinedResponse__WEBPACK_IMPORTED_MODULE_4__.renderUserDefinedResponse
  });
}
function BootstrapAgentic(contentRoot) {
  // Create a root for React to render into.
  console.log("Bootstrapping Agentic Chat in sidepanel");
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_2__.createRoot)(contentRoot);
  // Render the App component into the root.
  root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(App, null));
}

/***/ }),

/***/ "../agentic_chat/src/CardManager.css":
/*!*******************************************!*\
  !*** ../agentic_chat/src/CardManager.css ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CardManager_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!./CardManager.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/CardManager.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CardManager_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CardManager_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CardManager_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CardManager_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/CardManager.tsx":
/*!*******************************************!*\
  !*** ../agentic_chat/src/CardManager.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marked */ "../node_modules/.pnpm/marked@16.3.0/node_modules/marked/lib/marked.esm.js");
/* harmony import */ var _CardManager_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CardManager.css */ "../agentic_chat/src/CardManager.css");
/* harmony import */ var _CustomResponseStyles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CustomResponseStyles.css */ "../agentic_chat/src/CustomResponseStyles.css");
/* harmony import */ var _task_status_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./task_status_component */ "../agentic_chat/src/task_status_component.tsx");
/* harmony import */ var _action_status_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./action_status_component */ "../agentic_chat/src/action_status_component.tsx");
/* harmony import */ var _coder_agent_output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coder_agent_output */ "../agentic_chat/src/coder_agent_output.tsx");
/* harmony import */ var _app_analyzer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app_analyzer_component */ "../agentic_chat/src/app_analyzer_component.tsx");
/* harmony import */ var _task_decomposition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./task_decomposition */ "../agentic_chat/src/task_decomposition.tsx");
/* harmony import */ var _shortlister__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shortlister */ "../agentic_chat/src/shortlister.tsx");
/* harmony import */ var _generic_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./generic_component */ "../agentic_chat/src/generic_component.tsx");
/* harmony import */ var _action_agent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./action_agent */ "../agentic_chat/src/action_agent.tsx");
/* harmony import */ var _qa_agent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./qa_agent */ "../agentic_chat/src/qa_agent.tsx");
/* harmony import */ var _Followup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Followup */ "../agentic_chat/src/Followup.tsx");
/* harmony import */ var _StreamingWorkflow__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./StreamingWorkflow */ "../agentic_chat/src/StreamingWorkflow.ts");
/* harmony import */ var _ToolReview__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ToolReview */ "../agentic_chat/src/ToolReview.tsx");
/* harmony import */ var _VariablesSidebar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./VariablesSidebar */ "../agentic_chat/src/VariablesSidebar.tsx");




// Import components from CustomResponseExample













// Color constant for highlighting important information
const HIGHLIGHT_COLOR = "#4e00ec";

// Extend the global interface typing to include the new loader API

const CardManager = ({
  chatInstance
}) => {
  const [currentSteps, setCurrentSteps] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [currentCardId, setCurrentCardId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isProcessingComplete, setIsProcessingComplete] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showDetails, setShowDetails] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [isReasoningCollapsed, setIsReasoningCollapsed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [hasFinalAnswer, setHasFinalAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [currentStepIndex, setCurrentStepIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isStopped, setIsStopped] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [viewMode, setViewMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('inplace');
  const [globalVariables, setGlobalVariables] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [variablesHistory, setVariablesHistory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [selectedAnswerId, setSelectedAnswerId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  // Loader for next step within this card is derived from processing state
  const cardRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const stepRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});

  // Function to mark a step as completed
  const markStepCompleted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(stepId => {
    setCurrentSteps(prev => prev.map(step => step.id === stepId ? {
      ...step,
      completed: true
    } : step));
  }, []);

  // Initialize global interface

  // No cross-card loader logic needed; loader will be shown within the card while processing

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (typeof window !== "undefined") {
      console.log("Setting up global aiSystemInterface");
      window.aiSystemInterface = {
        addStep: (title, content) => {
          console.log("🎯 addStep called:", title, content);
          console.log("🎯 Current steps before adding:", currentSteps.length);
          const newStep = {
            id: `step-${Date.now()}-${Math.random()}`,
            title,
            content,
            expanded: true,
            isNew: true,
            timestamp: Date.now()
          };
          setCurrentSteps(prev => {
            console.log("🎯 setCurrentSteps called with prev length:", prev.length);
            // If this is the first step, start a new card
            if (prev.length === 0) {
              const newCardId = `card-${Date.now()}`;
              setCurrentCardId(newCardId);
              console.log("🎯 First step - creating new card:", newCardId);
              return [newStep];
            }
            // Otherwise, add to current card
            console.log("🎯 Adding to existing card");
            return [...prev, newStep];
          });

          // Handle in-place card switching vs append mode
          if (viewMode === 'inplace') {
            if (currentSteps.length > 0) {
              setCurrentStepIndex(prev => prev + 1);
            } else {
              setCurrentStepIndex(0);
            }
          }

          // Auto-expand "Waiting for your input" components and collapse reasoning
          if (title === "SuggestHumanActions") {
            setShowDetails(prev => ({
              ...prev,
              [newStep.id]: true
            }));
            // Collapse reasoning process when user action is needed
            setIsReasoningCollapsed(true);
          }

          // Check if this is a final answer step
          if (title === "FinalAnswerAgent" || title === "FinalAnswer") {
            console.log("🎯 Final answer detected, triggering reasoning collapse");
            setHasFinalAnswer(true);
            // Collapse reasoning immediately when final answer arrives
            setIsReasoningCollapsed(true);
            // Show details by default for final answer
            setShowDetails(prev => ({
              ...prev,
              [newStep.id]: true
            }));
          }
        },
        // No external loader toggle needed for within-card loading
        getAllSteps: () => currentSteps,
        stopProcessing: () => {
          setIsStopped(true);
          setIsProcessingComplete(true);
          setIsReasoningCollapsed(true);
          setShowDetails({});
        },
        isProcessingStopped: () => isProcessingComplete,
        setProcessingComplete: isComplete => {
          setIsProcessingComplete(isComplete);
        },
        forceReset: () => {
          setCurrentSteps([]);
          setIsProcessingComplete(false);
          setCurrentCardId(null);
          setIsReasoningCollapsed(false);
          setHasFinalAnswer(false);
          setCurrentStepIndex(0);
          setIsStopped(false);
          setShowDetails({});
          stepRefs.current = {};
        },
        hasStepWithTitle: title => {
          return currentSteps.some(step => step.title === title);
        }
      };
    }
  }, [currentSteps, currentCardId, isProcessingComplete, viewMode]);

  // Auto-scroll to latest step
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (currentSteps.length > 0) {
      const timeoutId = setTimeout(() => {
        const latestStep = currentSteps[currentSteps.length - 1];
        const latestStepRef = stepRefs.current[latestStep.id];
        if (latestStepRef) {
          latestStepRef.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        } else if (cardRef.current) {
          // Fallback to container scroll if step ref not found
          cardRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [currentSteps.length]);

  // Cleanup step refs on unmount
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      stepRefs.current = {};
    };
  }, []);

  // Extract variables from final answer steps and track by turn
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const newHistory = [];
    let turnNumber = 0;
    currentSteps.forEach(step => {
      // Only process Answer or FinalAnswerAgent steps
      if (step.title !== "Answer" && step.title !== "FinalAnswerAgent") {
        return;
      }
      try {
        let parsedContent;
        let variables = {};
        if (typeof step.content === "string") {
          try {
            parsedContent = JSON.parse(step.content);

            // Check if we have variables in the parsed content
            if (parsedContent.data !== undefined && parsedContent.variables) {
              variables = parsedContent.variables;
            } else if (parsedContent.variables) {
              variables = parsedContent.variables;
            }
          } catch (e) {
            // Not JSON, skip
          }
        } else if (step.content && typeof step.content === "object" && 'variables' in step.content) {
          const contentWithVars = step.content;
          if (contentWithVars.variables) {
            variables = contentWithVars.variables;
          }
        }

        // Only add to history if this step has variables
        if (Object.keys(variables).length > 0) {
          newHistory.push({
            id: step.id,
            title: `Turn ${turnNumber}`,
            timestamp: step.timestamp,
            variables: variables
          });
          turnNumber++;
        }
      } catch (e) {
        // Skip this step
      }
    });

    // Update history only if it actually changed
    setVariablesHistory(prev => {
      // Check if history actually changed
      if (prev.length !== newHistory.length) {
        console.log('Variables history updated: length changed', prev.length, '->', newHistory.length);
        return newHistory;
      }

      // Check if any entries are different
      const hasChanges = prev.some((entry, index) => {
        const newEntry = newHistory[index];
        return !newEntry || entry.id !== newEntry.id || JSON.stringify(entry.variables) !== JSON.stringify(newEntry.variables);
      });
      if (hasChanges) {
        console.log('Variables history updated: content changed');
      }
      return hasChanges ? newHistory : prev;
    });

    // Set selected answer to the most recent one if none selected or if current selection is gone
    if (newHistory.length > 0) {
      setSelectedAnswerId(prev => {
        if (!prev || !newHistory.find(e => e.id === prev)) {
          console.log('Auto-selecting most recent turn:', newHistory[newHistory.length - 1].title);
          return newHistory[newHistory.length - 1].id;
        }
        return prev;
      });
    } else {
      // No history, clear selection
      setSelectedAnswerId(null);
    }
  }, [currentSteps]);

  // Update globalVariables based on selected answer
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (selectedAnswerId) {
      const selected = variablesHistory.find(e => e.id === selectedAnswerId);
      if (selected) {
        setGlobalVariables(selected.variables);
      }
    } else if (variablesHistory.length > 0) {
      // Default to most recent
      setGlobalVariables(variablesHistory[variablesHistory.length - 1].variables);
    } else {
      setGlobalVariables({});
    }
  }, [selectedAnswerId, variablesHistory]);

  // Function to generate natural language descriptions for each case
  const getCaseDescription = (stepTitle, parsedContent) => {
    switch (stepTitle) {
      case "PlanControllerAgent":
        if (parsedContent.subtasks_progress && parsedContent.next_subtask) {
          const completed = parsedContent.subtasks_progress.filter(status => status === "completed").length;
          const total = parsedContent.subtasks_progress.length;
          if (total === 0) {
            return `I'm managing the overall task progress. There's <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">one next task</span>. ${parsedContent.conclude_task ? 'The task is ready to be concluded.' : `Next up: <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${parsedContent.next_subtask}</span>`}`;
          }
          return `I'm managing the overall task progress. Currently <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${completed} out of ${total} subtasks</span> are completed. ${parsedContent.conclude_task ? 'The task is ready to be concluded.' : `Next up: <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${parsedContent.next_subtask}</span>`}`;
        }
        return "I'm analyzing the task structure and planning the execution approach.";
      case "TaskDecompositionAgent":
        const taskCount = parsedContent.task_decomposition?.length || 0;
        return `I've broken down your request into <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${taskCount} manageable steps</span>. Each step is designed to work with specific applications and accomplish a specific part of your overall goal.`;
      case "APIPlannerAgent":
        if (parsedContent.action && (parsedContent.action_input_coder_agent || parsedContent.action_input_shortlisting_agent || parsedContent.action_input_conclude_task)) {
          const actionType = parsedContent.action;
          if (actionType === "CoderAgent") {
            return `I'm preparing to write code for you. The task involves: <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${parsedContent.action_input_coder_agent?.task_description || 'Code generation task'}</span>`;
          } else if (actionType === "ApiShortlistingAgent") {
            const taskDesc = parsedContent.action_input_shortlisting_agent?.task_description;
            if (taskDesc) {
              const preview = taskDesc.length > 60 ? taskDesc.substring(0, 60) + '...' : taskDesc;
              return `I'm analyzing available APIs, <span style="color:${HIGHLIGHT_COLOR}; font-weight:500;">${preview}</span>`;
            }
            return `I'm analyzing available APIs to find the best options for your request. This will help me understand what tools are available to accomplish your task.`;
          } else if (actionType === "ConcludeTask") {
            const taskDesc = parsedContent.action_input_conclude_task?.final_response;
            if (taskDesc) {
              const preview = taskDesc.length > 60 ? taskDesc.substring(0, 60) + '...' : taskDesc;
              return `I'm ready to provide you with the final answer based on all the work completed so far. <span style="color:${HIGHLIGHT_COLOR}; font-weight:500;">${preview}</span>`;
            }
            return `I'm ready to provide you with the final answer based on all the work completed so far.`;
          }
        }
        return "I'm reflecting on the code and planning the next steps in the workflow.";
      case "CodeAgent":
        if (parsedContent.code) {
          const codeLines = parsedContent.code.split('\n').length;
          const outputPreview = parsedContent.execution_output ? parsedContent.execution_output.substring(0, 50) + (parsedContent.execution_output.length > 50 ? '...' : '') : '';
          return `I've generated and executed <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${codeLines} lines of code</span> to accomplish your request. Here's a preview of the output: <span style="color:#10b981; font-family:monospace; background:#f0fdf4; padding:2px 4px; border-radius:3px; font-weight:500;">${outputPreview}</span>`;
        }
        return "I'm working on generating code for your request.";
      case "ShortlisterAgent":
        if (parsedContent.result) {
          const apiCount = parsedContent.result.length;
          const topResult = parsedContent.result[0];
          const topScore = topResult?.relevance_score || 0;
          const apiName = topResult?.name || topResult?.title || 'Unknown API';
          const truncatedName = apiName.length > 30 ? apiName.substring(0, 30) + '...' : apiName;
          return `I've analyzed and shortlisted <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${apiCount} relevant APIs</span> for your request. The top match is <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${truncatedName}</span> with a <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${Math.round(topScore * 100)}% relevance score</span>.`;
        }
        return "I'm analyzing available APIs to find the most relevant ones for your request.";
      case "TaskAnalyzerAgent":
        if (parsedContent && Array.isArray(parsedContent)) {
          const appNames = parsedContent.map(app => `<span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${app.name}</span>`).join(', ');
          return `I've identified <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${parsedContent.length} integrated applications</span> that can help with your request: ${appNames}. These apps are ready to be used in the workflow.`;
        }
        return "I'm analyzing the available applications to understand what tools we can use.";
      case "PlannerAgent":
        return `I'm planning the next action in the workflow. This involves determining the best approach to continue working on your request.`;
      case "QaAgent":
        if (parsedContent.name && parsedContent.answer) {
          return `I've analyzed the question "<span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${parsedContent.name}</span>" and provided a comprehensive answer with <span style="color:${HIGHLIGHT_COLOR}; font-weight: 600;">${parsedContent.answer.split(' ').length} words</span>.`;
        }
        return "I'm processing a question and preparing a detailed answer.";
      case "FinalAnswerAgent":
        if (parsedContent.final_answer) {
          return `I've completed your request and prepared the final answer.`;
        }
        return "I'm preparing the final answer to your request.";
      case "SuggestHumanActions":
        if (parsedContent.action_id) {
          return "I'm waiting for your input to continue. Please review the suggested action and let me know how you'd like to proceed.";
        }
        return "I'm preparing suggestions for your next action.";
      case "APICodePlannerAgent":
        const contentPreview = typeof parsedContent === 'string' ? parsedContent : JSON.stringify(parsedContent);
        const preview = contentPreview.length > 80 ? contentPreview.substring(0, 80) + '...' : contentPreview;
        return `I've generated a plan for the coding agent to follow. Plan preview: <span style="color:${HIGHLIGHT_COLOR}; font-weight:500;">${preview}</span>`;
      default:
        return "I'm processing your request and working on the next step in the workflow.";
    }
  };

  // Memoized function to render the appropriate component based on step title and content
  const renderStepContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(step => {
    try {
      let parsedContent;
      if (typeof step.content === "string") {
        try {
          parsedContent = JSON.parse(step.content);
          const keys = Object.keys(parsedContent);
          console.log(`[${step.title}] Raw parsed content:`, parsedContent);
          console.log(`[${step.title}] Has data:`, parsedContent.data !== undefined);
          console.log(`[${step.title}] Has variables:`, !!parsedContent.variables);

          // Check if we have variables in the parsed content
          if (parsedContent.data !== undefined && parsedContent.variables) {
            console.log(`[${step.title}] Processing with variables...`);

            // For Answer step with variables: treat data as final_answer
            if (step.title === "Answer" || step.title === "FinalAnswerAgent") {
              parsedContent = {
                final_answer: parsedContent.data,
                variables: parsedContent.variables
              };
              console.log(`[${step.title}] Converted to final_answer format:`, parsedContent);
            } else if (typeof parsedContent.data === "object" && !Array.isArray(parsedContent.data)) {
              // Keep both data and variables if data is an object
              parsedContent = {
                ...parsedContent.data,
                variables: parsedContent.variables
              };
            } else {
              // If data is not an object, keep as is with variables
              parsedContent = {
                data: parsedContent.data,
                variables: parsedContent.variables
              };
            }
          } else if (keys.length === 1 && keys[0] === "data") {
            // Only data, no variables
            const data = parsedContent.data;
            parsedContent = data;
          }
        } catch (e) {
          parsedContent = step.content; // fallback
        }
      } else {
        parsedContent = step.content; // already an object
      }
      let outputElements = [];
      if (parsedContent && parsedContent.additional_data && parsedContent.additional_data.tool) {
        const newElem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ToolReview__WEBPACK_IMPORTED_MODULE_15__["default"], {
          toolData: parsedContent.additional_data.tool
        });
        outputElements.push(newElem);
      }
      let mainElement = null;
      switch (step.title) {
        case "PlanControllerAgent":
          if (parsedContent.subtasks_progress && parsedContent.next_subtask) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_task_status_component__WEBPACK_IMPORTED_MODULE_4__["default"], {
              taskData: parsedContent
            });
          }
          break;
        case "TaskDecompositionAgent":
          mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_task_decomposition__WEBPACK_IMPORTED_MODULE_8__["default"], {
            decompositionData: parsedContent
          });
          break;
        case "APIPlannerAgent":
          if (parsedContent.action && (parsedContent.action_input_coder_agent || parsedContent.action_input_shortlisting_agent || parsedContent.action_input_conclude_task)) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_action_status_component__WEBPACK_IMPORTED_MODULE_5__["default"], {
              actionData: parsedContent
            });
          } else {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_generic_component__WEBPACK_IMPORTED_MODULE_10__["default"], {
              title: "Code Reflection",
              content: parsedContent
            });
          }
          break;
        case "CodeAgent":
          if (parsedContent.code) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_coder_agent_output__WEBPACK_IMPORTED_MODULE_6__["default"], {
              coderData: parsedContent
            });
          }
          break;
        case "ShortlisterAgent":
          if (parsedContent) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_shortlister__WEBPACK_IMPORTED_MODULE_9__["default"], {
              shortlisterData: parsedContent
            });
          }
          break;
        case "WaitForResponse":
          return null;
        case "TaskAnalyzerAgent":
          if (parsedContent && Array.isArray(parsedContent)) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_app_analyzer_component__WEBPACK_IMPORTED_MODULE_7__["default"], {
              appData: parsedContent
            });
          }
          break;
        case "PlannerAgent":
          if (parsedContent) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_action_agent__WEBPACK_IMPORTED_MODULE_11__["default"], {
              agentData: parsedContent
            });
          }
          break;
        case "simple_text_box":
          if (parsedContent) {
            mainElement = parsedContent;
          }
          break;
        case "QaAgent":
          if (parsedContent) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_qa_agent__WEBPACK_IMPORTED_MODULE_12__["default"], {
              qaData: parsedContent
            });
          }
          break;
        case "Answer":
        case "FinalAnswerAgent":
          if (parsedContent) {
            // Handle both cases: final_answer field or just a string content
            const answerText = parsedContent.final_answer || (typeof parsedContent === 'string' ? parsedContent : null);
            console.log('Answer/FinalAnswerAgent - parsedContent:', parsedContent);
            console.log('Answer/FinalAnswerAgent - answerText:', answerText);
            if (answerText) {
              mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
                style: {
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#1e293b"
                },
                dangerouslySetInnerHTML: {
                  __html: (0,marked__WEBPACK_IMPORTED_MODULE_1__.marked)(answerText)
                }
              });
            }
          }
          break;
        case "SuggestHumanActions":
          if (parsedContent && parsedContent.action_id) {
            mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Followup__WEBPACK_IMPORTED_MODULE_13__.FollowupAction, {
              followupAction: parsedContent,
              callback: async d => {
                console.log("calling fetch again");
                // Mark this step as completed before proceeding
                markStepCompleted(step.id);
                await (0,_StreamingWorkflow__WEBPACK_IMPORTED_MODULE_14__.fetchStreamingData)(chatInstance, "", d);
              }
            });
          }
          break;
        default:
          const isJSONLike = parsedContent !== null && (typeof parsedContent === "object" || Array.isArray(parsedContent)) && !(parsedContent instanceof Date) && !(parsedContent instanceof RegExp);
          if (isJSONLike) {
            parsedContent = JSON.stringify(parsedContent, null, 2);
            parsedContent = `\`\`\`json\n${parsedContent}\n\`\`\``;
          }
          if (!parsedContent) {
            parsedContent = "";
          }
          mainElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_generic_component__WEBPACK_IMPORTED_MODULE_10__["default"], {
            title: step.title,
            content: parsedContent
          });
      }

      // Add main element to outputElements if it exists
      if (mainElement) {
        outputElements.push(mainElement);
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, outputElements);
    } catch (error) {
      console.log(`Failed to parse JSON for step ${step.title}:`, error);
      return null;
    }
  }, [chatInstance, markStepCompleted]);

  // Memoized button click handler
  const handleToggleDetails = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(stepId => {
    console.log('Button clicked for step:', stepId, 'Current state:', showDetails[stepId]);
    setShowDetails(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  }, [showDetails]);

  // Handle reasoning collapse toggle
  const handleToggleReasoning = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsReasoningCollapsed(prev => !prev);
  }, []);
  const mapStepTitle = stepTitle => {
    const titleMap = {
      TaskDecompositionAgent: "Decomposed task into steps",
      TaskAnalyzerAgent: "Analyzed available applications",
      PlanControllerAgent: "Controlled task execution",
      SuggestHumanActions: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Waiting for your input")),
      APIPlannerAgent: "Planned API actions",
      APICodePlannerAgent: "Planned steps for coding agent",
      CodeAgent: "Generated code solution",
      ShortlisterAgent: "Shortlisted relevant APIs",
      QaAgent: "Answered question",
      FinalAnswerAgent: "Completed final answer",
      Answer: "Answer"
    };
    return titleMap[stepTitle] || stepTitle;
  };
  console.log("CardManager render - currentSteps:", currentSteps.length, "isProcessingComplete:", isProcessingComplete);

  // Check if there's an error step
  const hasErrorStep = currentSteps.some(step => step.title === "Error");

  // Separate final answer steps and active user action steps from reasoning steps
  const finalAnswerSteps = currentSteps.filter(step => step.title === "FinalAnswerAgent" || step.title === "FinalAnswer");

  // Show SuggestHumanActions as active if it's not marked as completed
  const userActionSteps = currentSteps.filter(step => step.title === "SuggestHumanActions" && !step.completed);

  // Include completed SuggestHumanActions in reasoning steps
  const reasoningSteps = currentSteps.filter(step => step.title !== "FinalAnswerAgent" && step.title !== "FinalAnswer" && !(step.title === "SuggestHumanActions" && !step.completed));

  // Get current step to display (before final answer or user action)
  const currentStep = currentSteps[currentStepIndex];
  const isShowingCurrentStep = !isStopped && viewMode === 'inplace' && !hasFinalAnswer && userActionSteps.length === 0 && currentStep;
  const isLoading = !isStopped && currentSteps.length > 0 && !isProcessingComplete && !hasFinalAnswer && userActionSteps.length === 0 && !hasErrorStep;

  // Helper function to render a single step card
  const renderStepCard = (step, isCurrentStep = false) => {
    // Parse content for description
    let parsedContent;
    try {
      if (typeof step.content === "string") {
        try {
          parsedContent = JSON.parse(step.content);
          const keys = Object.keys(parsedContent);
          if (keys.length === 1 && keys[0] === "data") {
            const data = parsedContent.data;
            parsedContent = data;
          }
        } catch (e) {
          parsedContent = step.content;
        }
      } else {
        parsedContent = step.content;
      }
    } catch (error) {
      parsedContent = step.content;
    }
    if (step.title === "simple_text") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: step.id,
        style: {
          marginBottom: "10px"
        }
      }, step.content);
    }

    // Only render component content if details are shown
    const componentContent = showDetails[step.id] ? renderStepContent(step) : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: step.id,
      ref: el => {
        stepRefs.current[step.id] = el;
      },
      className: `component-container ${step.isNew ? "new-component" : ""} ${isCurrentStep ? "current-step" : ""}`,
      style: {
        marginBottom: "16px",
        padding: "12px",
        paddingTop: "28px",
        backgroundColor: "#ffffff",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        position: "relative"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
      style: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#475569",
        margin: "0",
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }
    }, mapStepTitle(step.title))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        marginBottom: "12px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      style: {
        margin: "0",
        fontSize: "13px",
        color: "#64748b",
        lineHeight: "1.4"
      },
      dangerouslySetInnerHTML: {
        __html: getCaseDescription(step.title, parsedContent)
      }
    })), componentContent && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, componentContent), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: () => handleToggleDetails(step.id),
      style: {
        position: "absolute",
        right: "8px",
        top: "8px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "transparent",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "4px 8px",
        fontSize: "11px",
        color: showDetails[step.id] ? "#3b82f6" : "#64748b",
        cursor: "pointer"
      },
      onMouseOver: e => {
        e.currentTarget.style.backgroundColor = "#f8fafc";
      },
      onMouseOut: e => {
        e.currentTarget.style.backgroundColor = "transparent";
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      style: {
        display: "inline-block",
        transform: showDetails[step.id] ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        fontSize: "12px"
      }
    }, "\u25BC"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "details")));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VariablesSidebar__WEBPACK_IMPORTED_MODULE_16__["default"], {
    variables: globalVariables,
    history: variablesHistory,
    selectedAnswerId: selectedAnswerId,
    onSelectAnswer: setSelectedAnswerId
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-container",
    ref: cardRef
  }, !isStopped && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "6px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      fontSize: "11px",
      color: "#64748b"
    }
  }, "View:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setViewMode('inplace'),
    style: {
      padding: "2px 6px",
      backgroundColor: viewMode === 'inplace' ? "#2563eb" : "transparent",
      color: viewMode === 'inplace' ? "#ffffff" : "#64748b",
      border: "1px solid #e5e7eb",
      borderRadius: "3px",
      fontSize: "10px",
      fontWeight: 500,
      cursor: "pointer"
    }
  }, "In-place"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setViewMode('append'),
    style: {
      padding: "2px 6px",
      backgroundColor: viewMode === 'append' ? "#2563eb" : "transparent",
      color: viewMode === 'append' ? "#ffffff" : "#64748b",
      border: "1px solid #e5e7eb",
      borderRadius: "3px",
      fontSize: "10px",
      fontWeight: 500,
      cursor: "pointer"
    }
  }, "Append"))), !isStopped && viewMode === 'append' && currentSteps.length > 0 && (hasFinalAnswer ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, reasoningSteps.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginBottom: "16px",
      padding: "12px",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      userSelect: "none"
    },
    onClick: handleToggleReasoning
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#374151",
      margin: "0",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      transform: isReasoningCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
      fontSize: "14px"
    }
  }, "\u25BC"), "Reasoning Process", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      fontSize: "12px",
      fontWeight: "400",
      color: "#6b7280",
      backgroundColor: "#e5e7eb",
      padding: "2px 8px",
      borderRadius: "12px"
    }
  }, reasoningSteps.length, " steps")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: "12px",
      color: "#6b7280",
      fontStyle: "italic"
    }
  }, isReasoningCollapsed ? "Click to expand" : "Click to collapse")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      maxHeight: isReasoningCollapsed ? "0" : "10000px",
      overflow: "hidden",
      transition: "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
      opacity: isReasoningCollapsed ? 0 : 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginTop: "12px"
    }
  }, reasoningSteps.map(step => renderStepCard(step, false))))), finalAnswerSteps.map(step => renderStepCard(step, false))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, currentSteps.map(step => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: step.id
  }, renderStepCard(step, false))))), isStopped && currentSteps.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginBottom: "16px",
      padding: "12px",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      userSelect: "none"
    },
    onClick: handleToggleReasoning
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#374151",
      margin: "0",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      transform: isReasoningCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
      fontSize: "14px"
    }
  }, "\u25BC"), "Reasoning Process", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      fontSize: "12px",
      fontWeight: "400",
      color: "#6b7280",
      backgroundColor: "#e5e7eb",
      padding: "2px 8px",
      borderRadius: "12px"
    }
  }, currentSteps.length, " steps")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: "12px",
      color: "#6b7280",
      fontStyle: "italic"
    }
  }, isReasoningCollapsed ? "Click to expand" : "Click to collapse")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      maxHeight: isReasoningCollapsed ? "0" : "10000px",
      overflow: "hidden",
      transition: "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
      opacity: isReasoningCollapsed ? 0 : 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginTop: "12px"
    }
  }, currentSteps.map(step => renderStepCard(step, false))))), isStopped && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginTop: "8px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginBottom: "16px",
      padding: "12px",
      backgroundColor: "#ffffff",
      borderRadius: "6px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    style: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#475569",
      margin: "0",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, "Task Interrupted")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    style: {
      margin: "0",
      fontSize: "13px",
      color: "#64748b",
      lineHeight: "1.4"
    }
  }, "The task was stopped by the user.")))), !isStopped && viewMode === 'inplace' && (hasFinalAnswer || userActionSteps.length > 0) && reasoningSteps.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginBottom: "16px",
      padding: "12px",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      userSelect: "none"
    },
    onClick: handleToggleReasoning
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#374151",
      margin: "0",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      transform: isReasoningCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
      fontSize: "14px"
    }
  }, "\u25BC"), "Reasoning Process", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      fontSize: "12px",
      fontWeight: "400",
      color: "#6b7280",
      backgroundColor: "#e5e7eb",
      padding: "2px 8px",
      borderRadius: "12px"
    }
  }, reasoningSteps.length, " steps")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: "12px",
      color: "#6b7280",
      fontStyle: "italic"
    }
  }, isReasoningCollapsed ? "Click to expand" : "Click to collapse")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      maxHeight: isReasoningCollapsed ? "0" : "10000px",
      overflow: "hidden",
      transition: "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
      opacity: isReasoningCollapsed ? 0 : 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginTop: "12px"
    }
  }, reasoningSteps.map(step => renderStepCard(step, false))))), !isStopped && viewMode === 'inplace' && isShowingCurrentStep && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `current-step-container ${isLoading ? "loading-border" : ""}`,
    style: {
      position: "relative",
      minHeight: "200px"
    }
  }, renderStepCard(currentStep, true)), !isStopped && viewMode === 'inplace' && finalAnswerSteps.map(step => renderStepCard(step, false)), !isStopped && viewMode === 'inplace' && userActionSteps.map(step => renderStepCard(step, false)), !isStopped && viewMode === 'inplace' && currentSteps.length > 0 && !isProcessingComplete && !hasFinalAnswer && userActionSteps.length === 0 && !hasErrorStep && !isShowingCurrentStep && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginTop: "8px",
      marginBottom: "2px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: "10px",
      color: "#94a3b8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "4px",
      userSelect: "none"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "CUGA is thinking..")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      height: "4px",
      position: "relative",
      overflow: "hidden",
      background: "#eef2ff",
      borderRadius: "9999px",
      boxShadow: "inset 0 0 0 1px #e5e7eb"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "28%",
      background: "linear-gradient(90deg, #a78bfa 0%, #6366f1 100%)",
      borderRadius: "9999px",
      animation: "cugaShimmer 1.7s infinite",
      boxShadow: "0 0 6px rgba(99,102,241,0.25)"
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", null, `
              @keyframes cugaShimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(300%); }
              }
            `))));
};
/* harmony default export */ __webpack_exports__["default"] = (CardManager);

/***/ }),

/***/ "../agentic_chat/src/CustomResponseStyles.css":
/*!****************************************************!*\
  !*** ../agentic_chat/src/CustomResponseStyles.css ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CustomResponseStyles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!./CustomResponseStyles.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/CustomResponseStyles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CustomResponseStyles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CustomResponseStyles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CustomResponseStyles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_CustomResponseStyles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/Followup.tsx":
/*!****************************************!*\
  !*** ../agentic_chat/src/Followup.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FollowupAction: function() { return /* binding */ FollowupAction; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/send.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/x.js");


const FollowupAction = ({
  followupAction,
  callback
}) => {
  const [response, setResponse] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [selectedValues, setSelectedValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isSubmitted, setIsSubmitted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [startTime] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Date.now());
  const [isWaiting, setIsWaiting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const {
    action_id,
    action_name,
    description,
    type,
    button_text,
    placeholder,
    options,
    max_selections,
    min_selections = 1,
    required = true,
    validation_pattern,
    max_length,
    min_length,
    color = "primary"
  } = followupAction;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const colorThemes = {
    primary: {
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      accent: "text-blue-600 border-blue-200 bg-blue-50"
    },
    success: {
      button: "bg-green-500 hover:bg-green-600 text-white",
      accent: "text-green-600 border-green-200 bg-green-50"
    },
    warning: {
      button: "bg-yellow-500 hover:bg-yellow-600 text-white",
      accent: "text-yellow-600 border-yellow-200 bg-yellow-50"
    },
    danger: {
      button: "bg-red-500 hover:bg-red-600 text-white",
      accent: "text-red-600 border-red-200 bg-red-50"
    },
    secondary: {
      button: "bg-gray-500 hover:bg-gray-600 text-white",
      accent: "text-gray-600 border-gray-200 bg-gray-50"
    }
  };
  const theme = colorThemes[color] || colorThemes.primary;
  const createResponse = responseData => {
    const baseResponse = {
      action_id,
      response_type: type,
      timestamp: new Date().toISOString(),
      response_time_ms: Date.now() - startTime,
      client_info: {
        user_agent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform
      }
    };
    return {
      ...baseResponse,
      ...responseData
    };
  };
  const handleSubmit = responseData => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    const fullResponse = createResponse(responseData);
    callback(fullResponse);
  };
  const handleTextSubmit = () => {
    if (!response.trim() && required) return;

    // Validation
    if (validation_pattern && !new RegExp(validation_pattern).test(response)) {
      // Replaced alert with a simple console log for demonstration.
      // In a real app, you'd use a custom modal or inline error message.
      console.error("Please enter a valid response");
      return;
    }
    if (min_length && response.length < min_length) {
      console.error(`Response must be at least ${min_length} characters`);
      return;
    }
    if (max_length && response.length > max_length) {
      console.error(`Response must be no more than ${max_length} characters`);
      return;
    }
    handleSubmit({
      text_response: response
    });
  };
  const handleButtonClick = () => {
    handleSubmit({
      button_clicked: true
    });
  };
  const handleConfirmation = confirmed => {
    handleSubmit({
      confirmed
    });
  };
  const handleSelectChange = value => {
    let newSelection;
    if (type === "multi_select") {
      if (selectedValues.includes(value)) {
        newSelection = selectedValues.filter(v => v !== value);
      } else {
        if (max_selections && selectedValues.length >= max_selections) {
          return;
        }
        newSelection = [...selectedValues, value];
      }
    } else {
      newSelection = [value];
    }
    setSelectedValues(newSelection);
    if (type === "select") {
      const selectedOptions = (options || []).filter(opt => newSelection.includes(opt.value));
      handleSubmit({
        selected_values: newSelection,
        selected_options: selectedOptions
      });
    }
  };
  const handleMultiSelectSubmit = () => {
    if (selectedValues.length < min_selections) {
      console.error(`Please select at least ${min_selections} option(s)`);
      return;
    }
    const selectedOptions = (options || []).filter(opt => selectedValues.includes(opt.value));
    handleSubmit({
      selected_values: selectedValues,
      selected_options: selectedOptions
    });
  };
  const renderWaitingState = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-center py-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm text-gray-500"
  }, "Loading..."));
  const renderActionContent = () => {
    if (isWaiting) {
      return renderWaitingState();
    }
    if (isSubmitted) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "flex items-center justify-center py-4 text-green-600"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "flex items-center space-x-2 bg-green-50 px-4 py-2 rounded border border-green-200"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: "w-5 h-5"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "text-sm font-medium"
      }, "Response submitted successfully!")));
    }
    switch (type) {
      case "button":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: handleButtonClick,
          disabled: isSubmitted,
          className: `w-full px-4 py-3 rounded font-medium ${theme.button} flex items-center justify-center gap-2 ${isSubmitted ? "opacity-50 cursor-not-allowed" : ""}`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, button_text || action_name));
      case "text_input":
      case "natural_language":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "space-y-3"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
          value: response,
          onChange: e => setResponse(e.target.value),
          placeholder: placeholder || "Enter your response...",
          disabled: isSubmitted,
          className: `w-full px-4 py-3 border border-gray-200 rounded resize-none focus:outline-none focus:border-blue-500 text-sm ${response.trim() ? theme.accent : ""} ${isSubmitted ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`,
          rows: type === "natural_language" ? 3 : 1,
          maxLength: max_length
        }), max_length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "text-xs text-gray-500 text-right"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
          className: response.length > max_length * 0.8 ? "text-orange-500" : ""
        }, response.length), "/", max_length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: handleTextSubmit,
          disabled: isSubmitted || !response.trim() && required,
          className: `px-4 py-2 rounded text-sm font-medium ${isSubmitted || !response.trim() && required ? "bg-gray-200 text-gray-400 cursor-not-allowed" : theme.button} flex items-center gap-2`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-4 h-4"
        }), "Submit"));
      case "select":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "space-y-2"
        }, (options || []).map(option => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          key: option.value,
          onClick: () => handleSelectChange(option.value),
          disabled: isSubmitted,
          className: `w-full px-4 py-3 text-left rounded border text-sm ${selectedValues.includes(option.value) ? theme.button : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"} ${isSubmitted ? "opacity-50 cursor-not-allowed" : ""}`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "font-medium"
        }, option.label), option.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "text-xs opacity-75 mt-1"
        }, option.description))));
      case "multi_select":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "space-y-3"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "space-y-2 max-h-48 overflow-y-auto"
        }, (options || []).map(option => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
          key: option.value,
          className: `flex items-start gap-3 p-3 rounded border cursor-pointer ${selectedValues.includes(option.value) ? theme.accent : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "checkbox",
          checked: selectedValues.includes(option.value),
          onChange: () => handleSelectChange(option.value),
          className: "mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500",
          disabled: isSubmitted || !selectedValues.includes(option.value) && !!max_selections && selectedValues.length >= max_selections
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "flex-1"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "text-sm font-medium"
        }, option.label), option.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "text-xs text-gray-600 mt-1"
        }, option.description))))), max_selections && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "text-xs text-gray-500"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
          className: selectedValues.length === max_selections ? "text-orange-500 font-medium" : ""
        }, selectedValues.length), "/", max_selections, " selected"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: handleMultiSelectSubmit,
          disabled: isSubmitted || selectedValues.length < min_selections,
          className: `px-4 py-2 rounded text-sm font-medium ${isSubmitted || selectedValues.length < min_selections ? "bg-gray-200 text-gray-400 cursor-not-allowed" : theme.button} flex items-center gap-2`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
          className: "w-4 h-4"
        }), "Submit (", selectedValues.length, ")"));
      case "confirmation":
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "flex gap-3"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: () => handleConfirmation(true),
          disabled: isSubmitted,
          className: `flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded font-medium flex items-center justify-center gap-2 ${isSubmitted ? "opacity-50 cursor-not-allowed" : ""}`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
          className: "w-4 h-4"
        }), "Confirm"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: () => handleConfirmation(false),
          disabled: isSubmitted,
          className: `flex-1 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium flex items-center justify-center gap-2 ${isSubmitted ? "opacity-50 cursor-not-allowed" : ""}`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "w-4 h-4"
        }), "Cancel"));
      default:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "text-gray-500 text-sm"
        }, "Unsupported action type: ", type);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white border border-gray-200 rounded p-4 mx-auto"
  }, !isWaiting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "font-medium text-gray-900 text-sm"
  }, action_name), required && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-red-500 text-xs"
  }, "*")), description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-gray-600 text-xs"
  }, description)), renderActionContent());
};

/***/ }),

/***/ "../agentic_chat/src/StreamManager.tsx":
/*!*********************************************!*\
  !*** ../agentic_chat/src/StreamManager.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   streamStateManager: function() { return /* binding */ streamStateManager; }
/* harmony export */ });
// streamStateManager.ts

class StreamStateManager {
  isStreaming = false;
  listeners = new Set();
  currentAbortController = null;
  setStreaming(streaming) {
    this.isStreaming = streaming;
    console.log("listeners", this.listeners);
    this.listeners.forEach(listener => listener(streaming));
  }
  getIsStreaming() {
    return this.isStreaming;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  setAbortController(controller) {
    this.currentAbortController = controller;
  }
  async stopStream() {
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    try {
      const response = await fetch("http://localhost:8005/stop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        console.error("Failed to stop stream on server");
      }
    } catch (error) {
      console.error("Error stopping stream:", error);
    }
    this.setStreaming(false);
  }
}
const streamStateManager = new StreamStateManager();

/***/ }),

/***/ "../agentic_chat/src/StreamingWorkflow.ts":
/*!************************************************!*\
  !*** ../agentic_chat/src/StreamingWorkflow.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FAKE_STREAM_DELAY: function() { return /* binding */ FAKE_STREAM_DELAY; },
/* harmony export */   FAKE_STREAM_FILE: function() { return /* binding */ FAKE_STREAM_FILE; },
/* harmony export */   USE_FAKE_STREAM: function() { return /* binding */ USE_FAKE_STREAM; },
/* harmony export */   fetchStreamingData: function() { return /* binding */ fetchStreamingData; },
/* harmony export */   streamViaBackground: function() { return /* binding */ streamViaBackground; }
/* harmony export */ });
/* harmony import */ var _microsoft_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fetch-event-source */ "../node_modules/.pnpm/@microsoft+fetch-event-source@2.0.1/node_modules/@microsoft/fetch-event-source/lib/esm/fetch.js");
/* harmony import */ var _StreamManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StreamManager */ "../agentic_chat/src/StreamManager.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../agentic_chat/src/constants.ts");




// When built without webpack DefinePlugin, `FAKE_STREAM` may not exist at runtime.
// Declare it for TypeScript and compute a safe value that won't throw if undefined.

const USE_FAKE_STREAM =  true ? !!false : 0;
const FAKE_STREAM_FILE = "/fake_data.json"; // Path to your JSON file
const FAKE_STREAM_DELAY = 1000; // Delay between fake stream events in milliseconds
// Unique timestamp generator for IDs
const generateTimestampId = () => {
  return Date.now().toString();
};
function renderPlan(planJson) {
  console.log("Current plan json", planJson);
  return planJson;
}
function getCurrentStep(event) {
  console.log("getCurrentStep received: ", event);
  switch (event.event) {
    case "__interrupt__":
      return;
    case "Stopped":
      // Handle the stopped event from the server
      if (window.aiSystemInterface) {
        window.aiSystemInterface.stopProcessing();
      }
      return renderPlan(event.data);
    default:
      return renderPlan(event.data);
  }
}
const simulateFakeStream = async (instance, query) => {
  console.log("Starting fake stream simulation with query:", query.substring(0, 50));

  // Create abort controller for this stream
  const abortController = new AbortController();
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(abortController);
  let fullResponse = "";
  let workflowInitialized = false;
  let workflowId = "workflow_" + generateTimestampId();

  // Set streaming state AFTER setting abort controller
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(true);
  try {
    // Check if already aborted before starting
    if (abortController.signal.aborted) {
      console.log("Stream aborted before starting");
      return fullResponse;
    }

    // Load the fake stream data from JSON file
    const response = await fetch(FAKE_STREAM_FILE, {
      signal: abortController.signal // Pass abort signal to fetch
    });
    if (!response.ok) {
      throw new Error(`Failed to load fake stream data: ${response.status} ${response.statusText}`);
    }
    const fakeStreamData = await response.json();
    if (!fakeStreamData.steps || !Array.isArray(fakeStreamData.steps)) {
      throw new Error("Invalid fake stream data format. Expected { steps: [{ name: string, data: any }] }");
    }
    workflowInitialized = true;

    // Card manager message is already created in customSendMessage, so we don't need to create another one here
    if (window.aiSystemInterface) {
      console.log("Card manager interface available for fake stream, skipping duplicate message creation");
    }

    // Use abortable delay for initial wait
    await abortableDelay(300, abortController.signal);

    // Process each step from the fake data
    for (let i = 0; i < fakeStreamData.steps.length; i++) {
      // Check abort signal at the start of each iteration
      if (abortController.signal.aborted) {
        console.log("Fake stream process aborted by user at step", i);
        break;
      }
      const step = fakeStreamData.steps[i];
      console.log(`Processing step ${i + 1}/${fakeStreamData.steps.length}: ${step.name}`);

      // Use abortable delay instead of regular setTimeout
      await abortableDelay(FAKE_STREAM_DELAY, abortController.signal);

      // Check again after delay in case it was aborted during the wait
      if (abortController.signal.aborted) {
        console.log("Fake stream process aborted during delay at step", i);
        break;
      }

      // Simulate the event
      const fakeEvent = {
        event: step.name,
        data: step.data
      };
      console.log("Simulating fake stream event:", fakeEvent);
      let currentStep = getCurrentStep(fakeEvent);
      let stepTitle = step.name;

      // Add the message (this is not abortable, but it's fast)
      // Use the card manager if available, otherwise add individual messages
      if (window.aiSystemInterface) {
        window.aiSystemInterface.addStep(stepTitle, currentStep);
      } else {
        await instance.messaging.addMessage({
          message_options: {
            response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
          },
          output: {
            generic: [{
              id: workflowId + stepTitle,
              response_type: "user_defined",
              user_defined: {
                user_defined_type: "my_unique_identifier",
                data: currentStep,
                step_title: stepTitle
              }
            }]
          }
        });
      }

      // Final check after adding message
      if (abortController.signal.aborted) {
        console.log("Fake stream process aborted after adding message at step", i);
        break;
      }
    }

    // If we completed all steps without aborting
    if (!abortController.signal.aborted) {
      console.log("Fake stream completed successfully");
    }
    return fullResponse;
  } catch (error) {
    if (error.name === "AbortError" || abortController.signal.aborted) {
      console.log("Fake stream was cancelled by user");

      // Add a message indicating the stream was stopped
      await instance.messaging.addMessage({
        message_options: {
          response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
        },
        output: {
          generic: [{
            id: workflowId + "_stopped",
            response_type: "text",
            text: `<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; color: #64748b; text-align: center; margin: 8px 0; display: flex; align-items: center; justify-content: center; gap: 8px;"><div style="font-size: 1.1rem;"></div><div><div style="font-size: 0.9rem; font-weight: 500; margin: 0; color: #475569;">Processing Stopped</div><div style="font-size: 0.75rem; opacity: 0.8; margin: 0; color: #64748b;">You stopped the task</div></div></div>`
          }]
        }
      });
      return fullResponse; // Return partial response
    } else {
      console.error("Fake streaming error:", error);

      // Add error message
      await instance.messaging.addMessage({
        message_options: {
          response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
        },
        output: {
          generic: [{
            id: workflowId + "_error",
            response_type: "text",
            text: "❌ An error occurred while processing your request."
          }]
        }
      });
      throw error;
    }
  } finally {
    // Always reset streaming state when done
    console.log("Cleaning up fake stream state");
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(false);
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(null);
  }
};

// Helper function to create abortable delays
function abortableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    // If already aborted, reject immediately
    if (signal.aborted) {
      reject(new Error("Aborted"));
      return;
    }
    const timeoutId = setTimeout(() => {
      resolve();
    }, ms);

    // Listen for abort signal
    const abortHandler = () => {
      clearTimeout(timeoutId);
      reject(new Error("Aborted"));
    };
    signal.addEventListener("abort", abortHandler, {
      once: true
    });
  });
}

// Enhanced streaming function that integrates workflow component
// Helper function to send messages easily
const addStreamMessage = async (instance, workflowId, stepTitle, data, responseType = "user_defined") => {
  // For the new card system, we don't add individual messages
  // Instead, we let the CardManager handle the steps through the global interface
  if (window.aiSystemInterface && responseType === "user_defined") {
    console.log("Adding step to card manager:", stepTitle, data);
    console.log("aiSystemInterface available:", !!window.aiSystemInterface);
    console.log("addStep function available:", !!window.aiSystemInterface.addStep);
    try {
      window.aiSystemInterface.addStep(stepTitle, data);
      console.log("Step added successfully");
    } catch (error) {
      console.error("Error adding step:", error);
    }
    return;
  } else {
    console.log("Not using card manager - aiSystemInterface:", !!window.aiSystemInterface, "responseType:", responseType);
  }

  // For text messages, still add them normally
  if (responseType === "text") {
    const messageConfig = {
      id: workflowId + stepTitle,
      response_type: "text",
      text: typeof data === "string" ? data : JSON.stringify(data)
    };
    await instance.messaging.addMessage({
      message_options: {
        response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
      },
      output: {
        generic: [messageConfig]
      }
    });
  }
};
const fetchStreamingData = async (instance, query, action = null) => {
  // Check if we should use fake streaming
  if (USE_FAKE_STREAM) {
    console.log("Using fake stream simulation");
    return simulateFakeStream(instance, query);
  }
  console.log("🚀 Starting new fetchStreamingData with query:", query.substring(0, 50));

  // Create abort controller for this stream
  const abortController = new AbortController();
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(abortController);
  let fullResponse = "";
  let workflowInitialized = false;
  let workflowId = "workflow_" + generateTimestampId();

  // Set streaming state
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(true);
  console.log("🎯 Set streaming to true, abort controller set");

  // Add abort listener for debugging
  abortController.signal.addEventListener("abort", () => {
    console.log("🛑 ABORT SIGNAL RECEIVED IN FETCH STREAM!");
  });
  try {
    // Check if already aborted before starting
    if (abortController.signal.aborted) {
      console.log("🛑 Stream aborted before starting");
      return fullResponse;
    }

    // Do not reset the existing UI; we want to preserve prior cards/history

    // Check after reset delay
    if (abortController.signal.aborted) {
      console.log("🛑 Stream aborted after UI reset");
      return fullResponse;
    }

    // First create the workflow component
    console.log("💬 Initializing workflow without adding placeholder chat message");
    workflowInitialized = true;

    // Give a moment for the new CardManager message to mount
    await abortableDelayV2(300, abortController.signal);

    // Check after initialization delay
    if (abortController.signal.aborted) {
      console.log("🛑 Stream aborted after initialization");
      return fullResponse;
    }
    console.log("🌊 Beginning stream connection");

    // Start streaming with abort signal
    await (0,_microsoft_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__.fetchEventSource)("http://localhost:8005/stream", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: query ? JSON.stringify({
        query
      }) : JSON.stringify(action),
      signal: abortController.signal,
      // 🔑 KEY: Pass abort signal to fetchEventSource

      async onopen(response) {
        console.log("🌊 Stream connection opened:", response.status);

        // Check if aborted during connection
        if (abortController.signal.aborted) {
          console.log("🛑 Stream aborted during connection opening");
          return;
        }
        // Intentionally no chat message here to avoid polluting history
      },
      async onmessage(ev) {
        // Check if aborted before processing message
        if (abortController.signal.aborted) {
          console.log("🛑 Stream aborted - skipping message processing");
          return;
        }
        let currentStep = getCurrentStep(ev);
        if (currentStep) {
          let stepTitle = ev.event;
          console.log("⚡ Processing step:", stepTitle);
          await addStreamMessage(instance, workflowId, stepTitle, currentStep, "user_defined");
        }

        // Check if aborted after processing message
        if (abortController.signal.aborted) {
          console.log("🛑 Stream aborted after processing message");
          return;
        }
      },
      async onclose() {
        console.log("🌊 Stream connection closed");
        console.log("🌊 Signal aborted state:", abortController.signal.aborted);
      },
      async onerror(err) {
        console.error("🌊 Stream error:", err);
        console.log("🌊 Error name:", err.name);
        console.log("🌊 Signal aborted:", abortController.signal.aborted);

        // Don't add error message if stream was aborted by user
        if (abortController.signal.aborted) {
          console.log("🛑 Stream error was due to user abort - not adding error message");
          return;
        }

        // Add error step for real errors
        if (workflowInitialized) {
          await addStreamMessage(instance, workflowId, "error", `An error occurred during processing: ${err.message}`, "text");
        }
      }
    });

    // Check if completed successfully or was aborted
    if (abortController.signal.aborted) {
      console.log("🛑 Stream completed due to abort");
    } else {
      console.log("🎉 Stream completed successfully");
    }
    return fullResponse;
  } catch (error) {
    console.log("❌ Caught error in fetchStreamingData:", error);
    console.log("❌ Error name:", error.name);
    console.log("❌ Signal aborted:", abortController.signal.aborted);

    // Handle abort vs real errors
    if (error.name === "AbortError" || error.message === "Aborted" || abortController.signal.aborted) {
      console.log("🛑 Fetch stream was cancelled by user");

      // Add a message indicating the stream was stopped
      if (workflowInitialized) {
        await addStreamMessage(instance, workflowId, "stopped", `<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px; padding: 12px 16px; color: white; text-align: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); margin: 8px 0; display: flex; align-items: center; justify-content: center; gap: 8px;"><div style="font-size: 1.2rem;">⏹</div><div><div style="font-size: 0.9rem; font-weight: 600; margin: 0;">Processing Stopped</div><div style="font-size: 0.75rem; opacity: 0.9; margin: 0;">Stopped by user</div></div></div>`, "text");
      }
      return fullResponse; // Return partial response
    } else {
      console.error("💥 Real error in fetchStreamingData:", error);

      // Add error step if workflow is initialized
      if (workflowInitialized) {
        await addStreamMessage(instance, workflowId, "error", `❌ An error occurred: ${error.message}`, "text");

        // Signal completion to the system on error
        if (window.aiSystemInterface && window.aiSystemInterface.setProcessingComplete) {
          window.aiSystemInterface.setProcessingComplete(true);
        }
      }
      throw error;
    }
  } finally {
    // Always reset streaming state when done
    console.log("🧹 Cleaning up fetch stream state");
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(false);
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(null);
    console.log("🧹 Fetch stream cleanup complete");
  }
};

// Enhanced abortable delay function (same as before but with logging)
function abortableDelayV2(ms, signal) {
  console.log(`⏰ Creating abortable delay for ${ms}ms, signal.aborted:`, signal.aborted);
  return new Promise((resolve, reject) => {
    // If already aborted, reject immediately
    if (signal.aborted) {
      console.log("⏰ Delay rejected immediately - already aborted");
      reject(new Error("Aborted"));
      return;
    }
    const timeoutId = setTimeout(() => {
      console.log("⏰ Delay timeout completed normally");
      resolve();
    }, ms);

    // Listen for abort signal
    const abortHandler = () => {
      console.log("⏰ Delay abort handler called - clearing timeout");
      clearTimeout(timeoutId);
      reject(new Error("Aborted"));
    };
    signal.addEventListener("abort", abortHandler, {
      once: true
    });
    console.log("⏰ Abort listener added to delay");
  });
}
const waitForInterfaceReady = async (timeoutMs = 3000, intervalMs = 100) => {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (window.aiSystemInterface && typeof window.aiSystemInterface.addStep === "function") {
      return;
    }
    await new Promise(r => setTimeout(r, intervalMs));
  }
  console.warn("aiSystemInterface not available after", timeoutMs, "ms");
};
const streamViaBackground = async (instance, query) => {
  // Guard against empty query
  if (!query?.trim()) {
    return;
  }

  // -------------------------------------------------------------
  // Replicate the original workflow UI behaviour (same as in
  // fetchStreamingData) so that incoming agent responses are
  // rendered through the side-panel component.
  // -------------------------------------------------------------

  // Preserve previous cards/history; do not force-reset the UI here

  // 2. Insert an initial user_defined message that hosts our Workflow UI
  const workflowId = "workflow_" + generateTimestampId();

  // For the new card system, we don't need to add the initial message here
  // as it's already handled in customSendMessage
  // await instance.messaging.addMessage({
  //   output: {
  //     generic: [
  //       {
  //         id: workflowId,
  //         response_type: "user_defined",
  //         user_defined: {
  //           user_defined_type: "my_unique_identifier",
  //           text: "Processing your request...",
  //         },
  //       } as any,
  //     },
  //   },
  // });

  // Wait until the workflow component has mounted
  await waitForInterfaceReady();

  // Track whether processing has been stopped
  let isStopped = false;
  const responseID = crypto.randomUUID();
  let accumulatedText = "";

  // We no longer push plain chat chunks for each stream segment because
  // the workflow component renders them in its own UI. Keeping chat
  // payloads suppressed avoids duplicate, unformatted messages.
  const pushPartial = _text => {};
  const pushComplete = _text => {};

  // -------------------------------------------------------------
  // Helper : parse the `content` received from the background into
  // an object compatible with the old fetchEventSource `ev` shape.
  // -------------------------------------------------------------
  const parseSSEContent = raw => {
    let eventName = "Message";
    const dataLines = [];
    raw.split(/\r?\n/).forEach(line => {
      if (line.startsWith("event:")) {
        eventName = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).trim());
      } else if (line.trim().length) {
        // If the line isn't prefixed, treat it as data as well
        dataLines.push(line.trim());
      }
    });
    return {
      event: eventName,
      data: dataLines.join("\n")
    };
  };

  // Add initial step indicating that the connection has been established
  if (window.aiSystemInterface) {
    window.aiSystemInterface.addStep("Connection Established", "Processing request and preparing response...");
  }

  // -------------------------------------------------------------
  // Listener for streaming responses coming back from the background
  // -------------------------------------------------------------
  const listener = message => {
    if (!message || message.source !== "background") return;
    switch (message.type) {
      case "agent_response":
        {
          const rawContent = message.content ?? "";

          // Convert the raw content into an SSE-like event structure so we can
          // reuse the original render logic.
          const ev = parseSSEContent(rawContent);

          // Handle workflow-step visualisation
          if (!isStopped && window.aiSystemInterface && !window.aiSystemInterface.isProcessingStopped()) {
            const currentStep = getCurrentStep(ev);
            if (currentStep) {
              const stepTitle = ev.event;
              if (ev.event === "Stopped") {
                // Graceful stop handling
                window.aiSystemInterface.stopProcessing();
                isStopped = true;
              } else if (!window.aiSystemInterface.hasStepWithTitle(stepTitle)) {
                window.aiSystemInterface.addStep(stepTitle, currentStep);
              }
            }
          }

          // No longer sending plain chat messages – only updating workflow UI
          accumulatedText += ev.data;
          break;
        }
      case "agent_complete":
        {
          // Finalise UI state (no plain chat message)

          if (window.aiSystemInterface && !isStopped) {
            window.aiSystemInterface.setProcessingComplete?.(true);
          }
          window.chrome.runtime.onMessage.removeListener(listener);
          break;
        }
      case "agent_error":
        {
          // Report error in workflow UI
          window.aiSystemInterface?.addStep("Error Occurred", `An error occurred during processing: ${message.message}`);
          if (window.aiSystemInterface && !isStopped) {
            window.aiSystemInterface.setProcessingComplete?.(true);
          }
          window.chrome.runtime.onMessage.removeListener(listener);
          break;
        }
      default:
        break;
    }
  };

  // Register the listener *before* dispatching the query so that no
  // early backend messages are missed.
  window.chrome.runtime.onMessage.addListener(listener);

  // -------------------------------------------------------------
  // Now dispatch the query to the background service-worker. We do
  // NOT await the response here because the background script keeps
  // the promise pending until the stream completes, which would block
  // our execution and cause UI updates to stall.
  // -------------------------------------------------------------

  window.chrome.runtime.sendMessage({
    source: "popup",
    type: "send_agent_query",
    query
  }).then(bgResp => {
    if (bgResp?.type === "error") {
      console.error("Background returned error during dispatch", bgResp);
      window.aiSystemInterface?.addStep("Error Occurred", bgResp.message || "Background error");
      window.aiSystemInterface?.setProcessingComplete?.(true);
    }
  }).catch(err => {
    console.error("Failed to dispatch agent_query", err);
    if (window.aiSystemInterface) {
      window.aiSystemInterface.addStep("Error Occurred", `An error occurred: ${err.message || "Failed to dispatch query"}`);
      window.aiSystemInterface.setProcessingComplete?.(true);
    }
  });
};


/***/ }),

/***/ "../agentic_chat/src/ToolReview.tsx":
/*!******************************************!*\
  !*** ../agentic_chat/src/ToolReview.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ToolCallFlowDisplay; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/database.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/external-link.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/hash.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/settings.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/shield.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/type.js");


function ToolCallFlowDisplay({
  toolData
}) {
  const toolCallData = toolData;
  const getArgIcon = (key, value) => {
    if (typeof value === "number") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "w-3 h-3 text-blue-500"
    });
    if (typeof value === "string") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: "w-3 h-3 text-green-500"
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "w-3 h-3 text-gray-500"
    });
  };
  const formatArgValue = value => {
    if (typeof value === "string") return `"${value}"`;
    return String(value);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg shadow-md border p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, toolCallData.name != "run_new_flow" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "w-5 h-5 text-emerald-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "w-4 h-4 text-emerald-500"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-lg font-semibold text-gray-800"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "w-4 h-4 text-blue-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm font-medium text-blue-800"
  }, "Flow Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-mono text-lg font-semibold text-blue-900 bg-white px-3 py-2 rounded border"
  }, toolCallData.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "w-4 h-4 text-green-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm font-medium text-green-800"
  }, "Inputs")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-2"
  }, Object.entries(toolCallData.args).map(([key, value]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: key,
    className: "bg-white rounded border p-3 flex items-center gap-3"
  }, getArgIcon(key, value), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "font-mono text-sm font-semibold text-gray-700"
  }, key, ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "font-mono text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded"
  }, formatArgValue(value)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
  }, typeof value))))), toolCallData.name != "run_new_flow" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between pt-2 border-t border-gray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "w-4 h-4 text-emerald-500"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm text-gray-600"
  }, "Verified and trusted flow")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200 border border-blue-200 hover:border-blue-300",
    onClick: () => {
      try {
        window.open("http://localhost:8005/flows/flow.html", "_blank");
      } catch (error) {
        alert("Local server not running. Please start your development server on port 8005.");
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Flow explained"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "w-3 h-3"
  })))))));
}

/***/ }),

/***/ "../agentic_chat/src/VariablePopup.css":
/*!*********************************************!*\
  !*** ../agentic_chat/src/VariablePopup.css ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!./VariablePopup.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablePopup.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/VariablePopup.tsx":
/*!*********************************************!*\
  !*** ../agentic_chat/src/VariablePopup.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marked */ "../node_modules/.pnpm/marked@16.3.0/node_modules/marked/lib/marked.esm.js");
/* harmony import */ var _VariablePopup_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VariablePopup.css */ "../agentic_chat/src/VariablePopup.css");



const VariablePopup = ({
  variable,
  onClose
}) => {
  const handleDownload = () => {
    const content = `# Variable: ${variable.name}\n\n**Type:** ${variable.type}\n\n${variable.description ? `**Description:** ${variable.description}\n\n` : ""}**Value:**\n\`\`\`\n${variable.value_preview}\n\`\`\``;
    const blob = new Blob([content], {
      type: "text/markdown"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${variable.name}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const formattedContent = `## ${variable.name}\n\n**Type:** \`${variable.type}\`${variable.count_items ? ` (${variable.count_items} items)` : ""}\n\n${variable.description ? `**Description:** ${variable.description}\n\n` : ""}**Value:**\n\`\`\`\n${variable.value_preview}\n\`\`\``;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Variable Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variable-popup-download-btn",
    onClick: handleDownload,
    title: "Download as Markdown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "currentColor"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M8.5 1a.5.5 0 0 0-1 0v8.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M3 13h10a1 1 0 0 0 1-1v-1.5a.5.5 0 0 0-1 0V12H3v-.5a.5.5 0 0 0-1 0V12a1 1 0 0 0 1 1z"
  })), "Download"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variable-popup-close-btn",
    onClick: onClose
  }, "\xD7"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-body",
    dangerouslySetInnerHTML: {
      __html: (0,marked__WEBPACK_IMPORTED_MODULE_1__.marked)(formattedContent)
    }
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (VariablePopup);

/***/ }),

/***/ "../agentic_chat/src/VariablesSidebar.css":
/*!************************************************!*\
  !*** ../agentic_chat/src/VariablesSidebar.css ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!./VariablesSidebar.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablesSidebar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/VariablesSidebar.tsx":
/*!************************************************!*\
  !*** ../agentic_chat/src/VariablesSidebar.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VariablePopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VariablePopup */ "../agentic_chat/src/VariablePopup.tsx");
/* harmony import */ var _VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VariablesSidebar.css */ "../agentic_chat/src/VariablesSidebar.css");



const VariablesSidebar = ({
  variables,
  history = [],
  selectedAnswerId,
  onSelectAnswer
}) => {
  const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [selectedVariable, setSelectedVariable] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const variableKeys = Object.keys(variables);
  console.log('VariablesSidebar render - variableKeys:', variableKeys.length, 'history:', history.length, 'selectedAnswerId:', selectedAnswerId);
  if (variableKeys.length === 0 && history.length === 0) {
    console.log('VariablesSidebar: No variables or history, not rendering');
    return null;
  }
  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `variables-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-sidebar-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variables-sidebar-toggle",
    onClick: () => setIsExpanded(!isExpanded),
    title: isExpanded ? "Collapse variables panel" : "Expand variables panel"
  }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    points: "15 18 9 12 15 6"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    points: "9 18 15 12 9 6"
  }))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-sidebar-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M4 7h16M4 12h16M4 17h16"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Variables"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "variables-count"
  }, variableKeys.length)), history.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    className: "variables-history-select",
    value: selectedAnswerId || '',
    onChange: e => onSelectAnswer && onSelectAnswer(e.target.value),
    onClick: e => e.stopPropagation(),
    title: "Select which conversation turn to view variables from"
  }, history.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: item.id,
    value: item.id
  }, item.title, " - ", Object.keys(item.variables).length, " variable", Object.keys(item.variables).length !== 1 ? 's' : '', " (", formatTimestamp(item.timestamp), ")"))))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-sidebar-content"
  }, history.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-history-info"
  }, "Viewing: ", history.find(h => h.id === selectedAnswerId)?.title || 'Latest turn', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "history-count"
  }, history.length, " turns total")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-list"
  }, variableKeys.map(varName => {
    const variable = variables[varName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: varName,
      className: "variable-item",
      onClick: () => setSelectedVariable({
        name: varName,
        ...variable
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-item-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", {
      className: "variable-name"
    }, varName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "variable-type"
    }, variable.type)), variable.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-description"
    }, variable.description), variable.count_items !== undefined && variable.count_items > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-meta"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "variable-count"
    }, variable.count_items, " items")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-preview"
    }, variable.value_preview ? variable.value_preview.substring(0, 80) + (variable.value_preview.length > 80 ? "..." : "") : ""));
  })))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variables-sidebar-floating-toggle",
    onClick: () => setIsExpanded(true),
    title: "Show variables panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    points: "9 18 15 12 9 6"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "variables-floating-count"
  }, variableKeys.length)), selectedVariable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VariablePopup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    variable: selectedVariable,
    onClose: () => setSelectedVariable(null)
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (VariablesSidebar);

/***/ }),

/***/ "../agentic_chat/src/WriteableElementExample.css":
/*!*******************************************************!*\
  !*** ../agentic_chat/src/WriteableElementExample.css ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.101.3/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!./WriteableElementExample.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WriteableElementExample.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_3_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/action_agent.tsx":
/*!********************************************!*\
  !*** ../agentic_chat/src/action_agent.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AgentThoughtsComponent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function AgentThoughtsComponent({
  agentData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data for demonstration

  // Use props if provided, otherwise use sample data
  const {
    thoughts,
    next_agent,
    instruction
  } = agentData;
  function getAgentColor(agentName) {
    const colors = {
      ActionAgent: "bg-blue-100 text-blue-800 border-blue-300",
      ValidationAgent: "bg-green-100 text-green-800 border-green-300",
      NavigationAgent: "bg-purple-100 text-purple-800 border-purple-300",
      AnalysisAgent: "bg-yellow-100 text-yellow-800 border-yellow-300",
      TestAgent: "bg-orange-100 text-orange-800 border-orange-300"
    };
    return colors[agentName] || "bg-gray-100 text-gray-800 border-gray-300";
  }
  function getAgentIcon(agentName) {
    const icons = {
      ActionAgent: "🎯",
      QaAgent: "🔍"
    };
    return icons[agentName] || "🤖";
  }
  function truncateThoughts(thoughtsArray, maxLength = 120) {
    const firstThought = thoughtsArray[0] || "";
    if (firstThought.length <= maxLength) return firstThought;
    return firstThought.substring(0, maxLength) + "...";
  }
  function truncateInstruction(instruction, maxLength = 80) {
    if (instruction.length <= maxLength) return instruction;
    return instruction.substring(0, maxLength) + "...";
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-base"
  }, "\uD83E\uDD16"), "Agent Workflow"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-700"
  }, "Processing")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 p-2 bg-gray-50 rounded border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, getAgentIcon(next_agent)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Next:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-2 py-1 rounded text-xs font-medium ${getAgentColor(next_agent)}`
  }, next_agent))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 p-2 bg-blue-50 rounded border border-blue-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDCCB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-600 mb-1"
  }, "Current Instruction"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed"
  }, truncateInstruction(instruction, 100))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Analysis (", thoughts.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, truncateThoughts(thoughts, 80)), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, thoughts.map((thought, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-300 mt-0.5 font-mono"
  }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thought))))))));
}

/***/ }),

/***/ "../agentic_chat/src/action_status_component.tsx":
/*!*******************************************************!*\
  !*** ../agentic_chat/src/action_status_component.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ActionStatusDashboard; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ActionStatusDashboard({
  actionData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data - you can replace this with props

  const {
    thoughts,
    action,
    action_input_shortlisting_agent,
    action_input_coder_agent,
    action_input_conclude_task
  } = actionData;
  function truncateText(text, maxLength = 80) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
  function getThoughtsSummary() {
    if (thoughts.length === 0) return "No thoughts recorded";
    const firstThought = truncateText(thoughts[0], 100);
    return firstThought;
  }
  function getActionIcon(actionType) {
    switch (actionType) {
      case "CoderAgent":
        return "👨‍💻";
      case "ShortlistingAgent":
        return "📋";
      case "conclude_task":
        return "🎯";
      default:
        return "⚡";
    }
  }
  function getActionColor(actionType) {
    switch (actionType) {
      case "CoderAgent":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ShortlistingAgent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "conclude_task":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  // Determine which action is active
  const activeAction = action;
  const activeActionInput = action_input_coder_agent || action_input_shortlisting_agent || action_input_conclude_task;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700"
  }, "Active Action"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-2 py-1 rounded text-xs font-medium ${getActionColor(activeAction)}`
  }, getActionIcon(activeAction), " ", activeAction)), activeActionInput && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `mb-3 p-2 rounded border ${getActionColor(activeAction)}`
  }, action_input_coder_agent && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDC68\u200D\uD83D\uDCBB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium text-purple-700"
  }, "Coder Agent Task")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-purple-600 leading-relaxed mb-2"
  }, action_input_coder_agent.task_description), action_input_coder_agent.context_variables_from_history && action_input_coder_agent.context_variables_from_history.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-600"
  }, "Context:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-wrap gap-1 mt-1"
  }, action_input_coder_agent.context_variables_from_history.slice(0, 3).map((variable, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    key: index,
    className: "px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs"
  }, variable)), action_input_coder_agent.context_variables_from_history.length > 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-500"
  }, "+", action_input_coder_agent.context_variables_from_history.length - 3, " more"))), action_input_coder_agent.relevant_apis && action_input_coder_agent.relevant_apis.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-600"
  }, "APIs:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-wrap gap-1 mt-1"
  }, action_input_coder_agent.relevant_apis.slice(0, 2).map((api, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    key: index,
    className: "px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs"
  }, api.api_name)), action_input_coder_agent.relevant_apis.length > 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-500"
  }, "+", action_input_coder_agent.relevant_apis.length - 2, " more")))), action_input_shortlisting_agent && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDCCB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium text-blue-700"
  }, "Shortlisting Agent Task")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-blue-600 leading-relaxed"
  }, action_input_shortlisting_agent.task_description)), action_input_conclude_task && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83C\uDFAF"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium text-green-700"
  }, "Task Conclusion")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-green-600 leading-relaxed"
  }, action_input_conclude_task.final_response))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `p-2 rounded text-center text-xs ${action_input_coder_agent ? "bg-purple-100 text-purple-700" : "bg-gray-50 text-gray-400"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm mb-1"
  }, "\uD83D\uDC68\u200D\uD83D\uDCBB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-medium"
  }, "Coder"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs"
  }, action_input_coder_agent ? "Active" : "Inactive")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `p-2 rounded text-center text-xs ${action_input_shortlisting_agent ? "bg-blue-100 text-blue-700" : "bg-gray-50 text-gray-400"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm mb-1"
  }, "\uD83D\uDCCB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-medium"
  }, "Shortlister"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs"
  }, action_input_shortlisting_agent ? "Active" : "Inactive")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `p-2 rounded text-center text-xs ${action_input_conclude_task ? "bg-green-100 text-green-700" : "bg-gray-50 text-gray-400"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm mb-1"
  }, "\uD83C\uDFAF"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-medium"
  }, "Conclude"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs"
  }, action_input_conclude_task ? "Active" : "Inactive"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Analysis (", thoughts.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, getThoughtsSummary()), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, thoughts.map((thought, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-300 mt-0.5 font-mono"
  }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thought))))))));
}

/***/ }),

/***/ "../agentic_chat/src/app_analyzer_component.tsx":
/*!******************************************************!*\
  !*** ../agentic_chat/src/app_analyzer_component.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AppAnalyzerComponent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function AppAnalyzerComponent({
  appData
}) {
  const [showAllApps, setShowAllApps] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data - you can replace this with props

  function getAppIcon(appName) {
    switch (appName.toLowerCase()) {
      case "gmail":
        return "📧";
      case "phone":
        return "📱";
      case "venmo":
        return "💰";
      case "calendar":
        return "📅";
      case "drive":
        return "📁";
      case "sheets":
        return "📊";
      case "slack":
        return "💬";
      case "spotify":
        return "🎵";
      case "uber":
        return "🚗";
      case "weather":
        return "🌤️";
      default:
        return "🔧";
    }
  }
  function getAppColor(appName) {
    switch (appName.toLowerCase()) {
      case "gmail":
        return "bg-red-100 text-red-700";
      case "phone":
        return "bg-blue-100 text-blue-700";
      case "venmo":
        return "bg-green-100 text-green-700";
      case "calendar":
        return "bg-purple-100 text-purple-700";
      case "drive":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  const displayedApps = showAllApps ? appData : appData.slice(0, 4);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDD0D"), "App Analysis"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
  }, appData.length, " apps")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-wrap gap-1.5 mb-3"
  }, displayedApps.map((app, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: `flex items-center gap-1.5 px-2 py-1 rounded ${getAppColor(app.name)}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, getAppIcon(app.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium capitalize"
  }, app.name)))), appData.length > 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowAllApps(!showAllApps),
    className: "text-xs text-blue-600 hover:text-blue-800"
  }, showAllApps ? "▲ Less" : `▼ +${appData.length - 4} more`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-gray-500"
  }, "\u2705 Ready to use ", appData.length, " integrated services"))));
}

/***/ }),

/***/ "../agentic_chat/src/coder_agent_output.tsx":
/*!**************************************************!*\
  !*** ../agentic_chat/src/coder_agent_output.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CoderAgentOutput; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-markdown */ "../node_modules/.pnpm/react-markdown@10.1.0_@types+react@18.3.24_react@18.3.1/node_modules/react-markdown/lib/index.js");


function CoderAgentOutput({
  coderData
}) {
  const [showFullCode, setShowFullCode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showFullOutput, setShowFullOutput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data - you can replace this with props

  const {
    code,
    summary
  } = coderData;
  function getCodeSnippet(fullCode, maxLines = 4) {
    const lines = fullCode.split("\n");
    if (lines.length <= maxLines) return fullCode;
    return lines.slice(0, maxLines).join("\n") + "\n...";
  }
  function truncateOutput(text, maxLength = 400) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
  const codeLines = code.split("\n").length;
  const outputLength = summary.length;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDCBB"), "Coder Agent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-purple-100 text-purple-700"
  }, "Complete")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Code (", codeLines, " lines)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullCode(!showFullCode),
    className: "text-xs text-purple-600 hover:text-purple-800"
  }, showFullCode ? "▲ Less" : "▼ More")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gray-900 rounded p-2",
    style: {
      overflowX: "scroll"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("pre", {
    className: "text-green-400 text-xs font-mono"
  }, showFullCode ? code : getCodeSnippet(code)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Output (", outputLength, " chars)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullOutput(!showFullOutput),
    className: "text-xs text-green-600 hover:text-green-800"
  }, showFullOutput ? "▲ Less" : "▼ More")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-green-50 rounded p-2 border border-green-200",
    style: {
      overflowY: "scroll"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-green-700 leading-relaxed"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1__.Markdown, null, showFullOutput ? summary : truncateOutput(summary))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex gap-3 text-xs text-gray-500"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\uD83D\uDCCA ", codeLines, " lines"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\uD83D\uDCDD ", outputLength, " chars"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\uD83C\uDFAF Complete")))));
}

/***/ }),

/***/ "../agentic_chat/src/constants.ts":
/*!****************************************!*\
  !*** ../agentic_chat/src/constants.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RESPONSE_USER_PROFILE: function() { return /* binding */ RESPONSE_USER_PROFILE; }
/* harmony export */ });
/* harmony import */ var _carbon_ai_chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @carbon/ai-chat */ "../node_modules/.pnpm/@carbon+ai-chat@0.5.1_@carbon+icon-helpers@10.65.0_@carbon+icons@11.66.0_@carbon+react@_b713c759c00ec96d0998973803a1d794/node_modules/@carbon/ai-chat/dist/es/chat.AppContainer.js");

const RESPONSE_USER_PROFILE = {
  id: "cuga",
  user_type: _carbon_ai_chat__WEBPACK_IMPORTED_MODULE_0__.U.BOT,
  nickname: "cuga",
  profile_picture_url: "https://avatars.githubusercontent.com/u/230847519?s=48&v=4"
};

/***/ }),

/***/ "../agentic_chat/src/customSendMessage.ts":
/*!************************************************!*\
  !*** ../agentic_chat/src/customSendMessage.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customSendMessage: function() { return /* binding */ customSendMessage; },
/* harmony export */   customStreamMessage: function() { return /* binding */ customStreamMessage; }
/* harmony export */ });
/* harmony import */ var _StreamingWorkflow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StreamingWorkflow */ "../agentic_chat/src/StreamingWorkflow.ts");
/* harmony import */ var _renderUserDefinedResponse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderUserDefinedResponse */ "../agentic_chat/src/renderUserDefinedResponse.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../agentic_chat/src/constants.ts");



const WELCOME_TEXT = `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 8px 12px; color: white; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); margin: 8px 0; position: relative; overflow: hidden; width: 100%; min-width: 0;"><div style="position: absolute; top: -10px; right: -10px; width: 20px; height: 20px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; animation: float 3s ease-in-out infinite;"></div><div style="position: relative; z-index: 2; display: flex; align-items: center; gap: 8px; width: 100%; min-width: 0; flex-wrap: wrap;"><div style="flex: 1; min-width: 0;"><h1 style="font-size: clamp(0.9rem, 2.5vw, 1.2rem); font-weight: 700; margin: 0 0 2px 0; background: linear-gradient(45deg, #fff, #e0e7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">👋 I'm CUGA</h1><p style="font-size: clamp(0.6rem, 2vw, 0.8rem); margin: 0; opacity: 0.9; font-weight: 300; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Your Digital Agent</p></div><div style="text-align: right; min-width: 0; flex-shrink: 0;"><p style="margin: 0; font-size: clamp(0.5rem, 1.5vw, 0.7rem); font-weight: 500; opacity: 0.9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">✨ Just ask!</p></div></div></div><style>@keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-5px) rotate(180deg); } } @media (max-width: 200px) { .welcome-container { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; } .welcome-container .features { justify-content: flex-start !important; } }</style>`;
const TEXT = `Lorem ipsum odor amet, consectetuer adipiscing elit. \`Inline Code Venenatis\` aliquet non platea elementum morbi porta accumsan. Tortor libero consectetur dapibus volutpat porta vestibulum.

Quam scelerisque platea ridiculus sem placerat pharetra sed. Porttitor per massa venenatis fusce fusce ad cras. Vel congue semper, rhoncus tempus nisl nam. Purus molestie tristique diam himenaeos sapien lacus.

| Lorem        | Ipsum      | Odor    | Amet      |
|--------------|------------|---------|-----------|
| consectetuer | adipiscing | elit    | Venenatis |
| 0            | 1          | 2       | 3         |
| bibendum     | enim       | blandit | quis      |


- consectetuer
- adipiscing
- elit
- Venenatis

` + "\n```python\n" + `import random

def generate_lorem_ipsum(paragraphs=1):
    # Base words for Lorem Ipsum
    lorem_words = (
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
        "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
        "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure "
        "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt "
        "mollit anim id est laborum."
    ).split()
    
    # Function to generate a random sentence
    def random_sentence():
        sentence_length = random.randint(4, 12)
        sentence = random.sample(lorem_words, sentence_length)
        return " ".join(sentence).capitalize() + "."
    
    # Function to generate a paragraph
    def random_paragraph():
        sentence_count = random.randint(3, 6)
        return " ".join(random_sentence() for _ in range(sentence_count))
    
    # Generate the requested number of paragraphs
    return "\\n\\n".join(random_paragraph() for _ in range(paragraphs))

# Example usage
print(generate_lorem_ipsum(2))  # Generates 2 paragraphs of Lorem Ipsum text
` + "\n\n```";
const WORD_DELAY = 40;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function doFakeTextStreaming(instance) {
  const responseID = crypto.randomUUID();
  const words = TEXT.split(" ");
  words.forEach((word, index) => {
    setTimeout(() => {
      instance.messaging.addMessageChunk({
        partial_item: {
          response_type: "text",
          text: `${word} `,
          streaming_metadata: {
            id: "1"
          }
        },
        streaming_metadata: {
          response_id: responseID
        }
      });
    }, index * WORD_DELAY);
  });
  await sleep(words.length * WORD_DELAY);
  const completeItem = {
    response_type: "text",
    text: `${TEXT}\n\nMore stuff on the end when adding as a complete item.`,
    streaming_metadata: {
      id: "1"
    }
  };
  instance.messaging.addMessageChunk({
    complete_item: completeItem,
    streaming_metadata: {
      response_id: responseID
    }
  });
  const finalResponse = {
    id: responseID,
    output: {
      generic: [completeItem]
    }
  };
  instance.messaging.addMessageChunk({
    final_response: finalResponse
  });
}
async function sleep(milliseconds) {
  await new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
async function customStreamMessage(request, _requestOptions, instance) {
  if (request.input.text === "") {
    instance.messaging.addMessage({
      message_options: {
        response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
      },
      output: {
        generic: [{
          response_type: "text",
          text: WELCOME_TEXT
        }]
      }
    });
  } else {
    switch (request.input.text) {
      default:
        await (0,_StreamingWorkflow__WEBPACK_IMPORTED_MODULE_0__.streamViaBackground)(instance, request.input.text || "");
        break;
    }
  }
}
async function customSendMessage(request, _requestOptions, instance) {
  if (request.input.text === "") {
    instance.messaging.addMessage({
      message_options: {
        response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
      },
      output: {
        generic: [{
          response_type: "text",
          text: WELCOME_TEXT
        }]
      }
    });
  } else {
    console.log("Setting up card manager for new request");
    // Reset any previous card manager state
    (0,_renderUserDefinedResponse__WEBPACK_IMPORTED_MODULE_1__.resetCardManagerState)();

    // No cross-card loader toggles needed anymore; loader is within each card while processing

    // Enable card manager for this request
    (0,_renderUserDefinedResponse__WEBPACK_IMPORTED_MODULE_1__.setCardManagerState)(true, instance);
    console.log("Card manager state set:", {
      shouldShowCardManager: true,
      instance: !!instance
    });

    // Create the host user_defined message for CardManager without placeholder text
    console.log("Creating CardManager host message");
    const testWorkflowId = "test_workflow_" + Date.now();
    await instance.messaging.addMessage({
      message_options: {
        response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
      },
      output: {
        generic: [{
          id: testWorkflowId,
          response_type: "user_defined",
          user_defined: {
            user_defined_type: "my_unique_identifier",
            isCardManager: true
          }
        }]
      }
    });
    console.log("CardManager host message created");
    switch (request.input.text) {
      default:
        await (0,_StreamingWorkflow__WEBPACK_IMPORTED_MODULE_0__.fetchStreamingData)(instance, request.input.text || "");
        break;
    }
  }
}


/***/ }),

/***/ "../agentic_chat/src/floating/stop_button.tsx":
/*!****************************************************!*\
  !*** ../agentic_chat/src/floating/stop_button.tsx ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StopButton: function() { return /* binding */ StopButton; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _StreamManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StreamManager */ "../agentic_chat/src/StreamManager.tsx");
/* harmony import */ var _WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WriteableElementExample.css */ "../agentic_chat/src/WriteableElementExample.css");
// StopButton.tsx



const StopButton = ({
  location = "sidebar"
}) => {
  const [isStreaming, setIsStreaming] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const unsubscribe = _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.subscribe(setIsStreaming);
    return unsubscribe;
  }, []);
  const handleStop = async () => {
    await _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.stopStream();
    if (typeof window !== "undefined" && window.aiSystemInterface) {
      try {
        window.aiSystemInterface.stopProcessing?.();
        window.aiSystemInterface.setProcessingComplete?.(true);
      } catch (e) {
        // noop
      }
    }
  };
  if (!isStreaming) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "floating-controls-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: handleStop
    // className="floating-toggle"
    ,
    style: {
      color: "black",
      border: "#c6c6c6 solid 1px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      opacity: "0.6",
      fontWeight: "400",
      borderRadius: "4px",
      marginBottom: "6px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    },
    onMouseOver: e => {
      e.currentTarget.style.backgroundColor = "black";
      e.currentTarget.style.color = "white";
      e.currentTarget.style.opacity = "1";
    },
    onMouseOut: e => {
      e.currentTarget.style.backgroundColor = "";
      e.currentTarget.style.color = "black";
      e.currentTarget.style.opacity = "0.6";
    }
  }, "Stop Processing"));
};

/***/ }),

/***/ "../agentic_chat/src/generic_component.tsx":
/*!*************************************************!*\
  !*** ../agentic_chat/src/generic_component.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SingleExpandableContent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-markdown */ "../node_modules/.pnpm/react-markdown@10.1.0_@types+react@18.3.24_react@18.3.1/node_modules/react-markdown/lib/index.js");


function SingleExpandableContent({
  title,
  content,
  maxLength = 600
}) {
  const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data for demonstration
  const sampleTitle = title;
  const sampleContent = content;
  const shouldTruncate = sampleContent.length > maxLength;
  const displayContent = isExpanded || !shouldTruncate ? sampleContent : sampleContent.substring(0, maxLength) + "...";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg shadow-md border p-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-xl font-bold text-gray-800 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCC4"), sampleTitle)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-4",
    style: {
      overflowY: "scroll"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-gray-700 leading-relaxed text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1__.Markdown, null, displayContent))), shouldTruncate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setIsExpanded(!isExpanded),
    className: "px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, isExpanded ? "Show less" : "Read more"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs"
  }, isExpanded ? "▲" : "▼"))))));
}

/***/ }),

/***/ "../agentic_chat/src/qa_agent.tsx":
/*!****************************************!*\
  !*** ../agentic_chat/src/qa_agent.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ QaAgentComponent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function QaAgentComponent({
  qaData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showFullAnswer, setShowFullAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data for demonstration

  // Use props if provided, otherwise use sample data
  const {
    thoughts,
    name,
    answer
  } = qaData;
  function truncateThoughts(thoughtsArray, maxLength = 120) {
    const firstThought = thoughtsArray[0] || "";
    if (firstThought.length <= maxLength) return firstThought;
    return firstThought.substring(0, maxLength) + "...";
  }
  function truncateAnswer(answer, maxLength = 500) {
    if (answer.length <= maxLength) return answer;
    return answer.substring(0, maxLength) + "...";
  }
  function getAnswerPreview(answer) {
    const truncated = truncateAnswer(answer, 500);
    return truncated;
  }
  function getAnswerIcon(answer) {
    if (answer.length < 50) return "💡";
    if (answer.length < 200) return "📝";
    return "📄";
  }
  function getAnswerColor(answer) {
    if (answer.length < 50) return "bg-green-100 text-green-800 border-green-300";
    if (answer.length < 200) return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-purple-100 text-purple-800 border-purple-300";
  }
  const isAnswerTruncated = answer.length > 500;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDD0D"), "QA Agent Response"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-700"
  }, "Analysis Complete")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Question:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", {
    className: "font-medium text-gray-800 text-xs bg-gray-50 rounded p-2 border"
  }, name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 border rounded p-2 hover:shadow-sm transition-shadow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, getAnswerIcon(answer)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium text-gray-700"
  }, "Answer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-1.5 py-0.5 rounded text-xs font-medium ${getAnswerColor(answer)}`
  }, answer.length, " chars"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, answer.split(" ").length, " words"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pl-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-blue-50 border border-blue-200 rounded p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed font-mono whitespace-pre-wrap"
  }, showFullAnswer ? answer : getAnswerPreview(answer)), isAnswerTruncated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullAnswer(!showFullAnswer),
    className: "px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs font-medium transition-colors flex items-center gap-1 mx-auto"
  }, showFullAnswer ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Show less"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs"
  }, "\u25B2")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Show full answer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs"
  }, "\u25BC"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center p-2 bg-blue-50 rounded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm font-bold text-blue-700"
  }, thoughts.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-blue-600"
  }, "Analysis Steps")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center p-2 bg-green-50 rounded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm font-bold text-green-700"
  }, answer.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-green-600"
  }, "Answer Length")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center p-2 bg-purple-50 rounded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm font-bold text-purple-700"
  }, answer.split(" ").length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-purple-600"
  }, "Words"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "QA Analysis (", thoughts.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, truncateThoughts(thoughts, 80)), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, thoughts.map((thought, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-300 mt-0.5 font-mono"
  }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thought))))))));
}

/***/ }),

/***/ "../agentic_chat/src/renderUserDefinedResponse.tsx":
/*!*********************************************************!*\
  !*** ../agentic_chat/src/renderUserDefinedResponse.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderUserDefinedResponse: function() { return /* binding */ renderUserDefinedResponse; },
/* harmony export */   resetCardManagerState: function() { return /* binding */ resetCardManagerState; },
/* harmony export */   setCardManagerState: function() { return /* binding */ setCardManagerState; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CardManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardManager */ "../agentic_chat/src/CardManager.tsx");



// Global state to track if we should show the card manager
let shouldShowCardManager = false;
let cardManagerInstance = null;

// Function to set the card manager state
const setCardManagerState = (show, instance) => {
  shouldShowCardManager = show;
  if (instance) {
    cardManagerInstance = instance;
  }
};

// Function to reset the card manager state
const resetCardManagerState = () => {
  shouldShowCardManager = false;
  cardManagerInstance = null;
};
function renderUserDefinedResponse(state, _instance) {
  const {
    messageItem
  } = state;
  console.log("renderUserDefinedResponse called:", {
    messageItem,
    shouldShowCardManager,
    cardManagerInstance: !!cardManagerInstance,
    isCardManager: messageItem?.user_defined?.isCardManager
  });
  if (messageItem) {
    switch (messageItem.user_defined?.user_defined_type) {
      case "my_unique_identifier":
        // Render the CardManager when card manager is enabled and properly configured
        if (shouldShowCardManager && cardManagerInstance && messageItem.user_defined.isCardManager) {
          console.log("Rendering CardManager");
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CardManager__WEBPACK_IMPORTED_MODULE_1__["default"], {
            chatInstance: cardManagerInstance
          });
        }
        console.log("Card manager not properly configured, returning null");
        return null;
      default:
        return undefined;
    }
  }
  return undefined;
}


/***/ }),

/***/ "../agentic_chat/src/shortlister.tsx":
/*!*******************************************!*\
  !*** ../agentic_chat/src/shortlister.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShortlisterComponent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ShortlisterComponent({
  shortlisterData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showAllApis, setShowAllApis] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data for demonstration

  // Use props if provided, otherwise use sample data
  const {
    thoughts,
    result
  } = shortlisterData;
  const displayedApis = showAllApis ? result : result.slice(0, 2);
  const remainingCount = result.length - 2;
  function getScoreColor(score) {
    if (score >= 0.95) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 0.9) return "bg-blue-100 text-blue-800 border-blue-300";
    if (score >= 0.8) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  }
  function getScoreIcon(score) {
    if (score >= 0.95) return "🎯";
    if (score >= 0.9) return "✅";
    if (score >= 0.8) return "👍";
    return "📝";
  }
  function truncateApiName(name, maxLength = 30) {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  }
  function truncateThoughts(thoughtsArray, maxLength = 120) {
    const firstThought = thoughtsArray[0] || "";
    if (firstThought.length <= maxLength) return firstThought;
    return firstThought.substring(0, maxLength) + "...";
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDD0D"), "API Shortlist"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-purple-100 text-purple-700"
  }, result.length, " APIs selected")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-2 mb-3"
  }, displayedApis.map((api, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "border rounded p-2 hover:shadow-sm transition-shadow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, getScoreIcon(api.relevance_score)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", {
    className: "font-medium text-gray-800 text-xs"
  }, truncateApiName(api.name, 25)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-1.5 py-0.5 rounded text-xs font-medium ${getScoreColor(api.relevance_score)}`
  }, (api.relevance_score * 100).toFixed(0), "%"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "#", index + 1))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-600 leading-relaxed pl-5"
  }, api.reasoning)))), result.length > 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowAllApis(!showAllApis),
    className: "px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-colors flex items-center gap-1 mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, showAllApis ? "Show less" : `Show ${remainingCount} more`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs"
  }, showAllApis ? "▲" : "▼"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center p-2 bg-green-50 rounded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm font-bold text-green-700"
  }, result.filter(api => api.relevance_score >= 0.95).length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-green-600"
  }, "High Priority")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center p-2 bg-blue-50 rounded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm font-bold text-blue-700"
  }, (result.reduce((sum, api) => sum + api.relevance_score, 0) / result.length * 100).toFixed(0), "%"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-blue-600"
  }, "Avg Score")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center p-2 bg-purple-50 rounded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm font-bold text-purple-700"
  }, result.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-purple-600"
  }, "APIs Found"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Analysis (", thoughts.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, truncateThoughts(thoughts, 80)), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, thoughts.map((thought, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-300 mt-0.5 font-mono"
  }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thought))))))));
}

/***/ }),

/***/ "../agentic_chat/src/task_decomposition.tsx":
/*!**************************************************!*\
  !*** ../agentic_chat/src/task_decomposition.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TaskDecompositionComponent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function TaskDecompositionComponent({
  decompositionData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Extract data from props
  const {
    thoughts,
    task_decomposition
  } = decompositionData;
  function getAppIcon(appName) {
    switch (appName?.toLowerCase()) {
      case "gmail":
        return "📧";
      case "phone":
        return "📱";
      case "venmo":
        return "💰";
      case "calendar":
        return "📅";
      case "drive":
        return "📁";
      case "sheets":
        return "📊";
      case "slack":
        return "💬";
      default:
        return "🔧";
    }
  }
  function getAppColor(appName) {
    switch (appName?.toLowerCase()) {
      case "gmail":
        return "bg-red-100 text-red-800 border-red-200";
      case "phone":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "venmo":
        return "bg-green-100 text-green-800 border-green-200";
      case "calendar":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "drive":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }
  function getStepNumber(index) {
    return String(index + 1).padStart(2, "0");
  }
  function truncateThoughts(text, maxLength = 120) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDCCB"), "Task Breakdown"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
  }, task_decomposition.length, " steps planned")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-2 mb-3"
  }, task_decomposition.map((task, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs"
  }, getStepNumber(index)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1 bg-gray-50 rounded p-2 border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-2 py-0.5 rounded text-xs font-medium ${getAppColor(task.app)}`
  }, getAppIcon(task.app), " ", task.app), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-1.5 py-0.5 bg-white rounded text-xs text-gray-600 border"
  }, task.type)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed"
  }, task.task)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Analysis"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, truncateThoughts(thoughts, 80)), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thoughts))))));
}

/***/ }),

/***/ "../agentic_chat/src/task_status_component.tsx":
/*!*****************************************************!*\
  !*** ../agentic_chat/src/task_status_component.tsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TaskStatusDashboard; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function TaskStatusDashboard({
  taskData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data - you can replace this with props

  const {
    thoughts,
    subtasks_progress,
    next_subtask,
    next_subtask_type,
    next_subtask_app,
    conclude_task,
    conclude_final_answer
  } = taskData;
  const total = subtasks_progress.length;
  const completed = subtasks_progress.filter(status => status === "completed").length;
  const progressPercentage = completed / total * 100;
  function getStatusIcon(status) {
    if (status === "completed") return "✅";
    if (status === "in-progress") return "🔄";
    if (status === "not-started") return "⏳";
    return "❓";
  }
  function getAppIcon(app) {
    if (!app) return "🔧";
    const appLower = app.toLowerCase();
    if (appLower === "gmail") return "📧";
    if (appLower === "calendar") return "📅";
    if (appLower === "drive") return "📁";
    if (appLower === "sheets") return "📊";
    return "🔧";
  }
  function getTypeColor(type) {
    if (type === "api") return "bg-blue-100 text-blue-800";
    if (type === "analysis") return "bg-purple-100 text-purple-800";
    if (type === "calculation") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  }
  function truncateText(text, maxLength = 80) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  // Create a summary of thoughts
  function getThoughtsSummary() {
    if (thoughts.length === 0) return "No thoughts recorded";
    const firstThought = truncateText(thoughts[0], 100);
    return firstThought;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700"
  }, "Task Progress"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-2 py-1 rounded text-xs font-medium ${conclude_task ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`
  }, conclude_task ? "Complete" : "Active")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 p-2 bg-gray-50 rounded border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Subtasks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, completed, "/", total)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1 bg-gray-200 rounded-full h-1.5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-green-500 h-1.5 rounded-full transition-all duration-300",
    style: {
      width: `${progressPercentage}%`
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex gap-1"
  }, subtasks_progress.map((status, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    key: index,
    className: "text-sm hover:scale-110 transition-transform cursor-pointer",
    title: `Task ${index + 1}: ${status.replace("-", " ")}`
  }, getStatusIcon(status)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 p-2 bg-blue-50 rounded border border-blue-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83C\uDFAF"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Next:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-1.5 py-0.5 rounded text-xs ${getTypeColor(next_subtask_type)}`
  }, next_subtask_type), next_subtask_app && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex items-center gap-1 px-1.5 py-0.5 bg-white rounded text-xs text-gray-600 border"
  }, getAppIcon(next_subtask_app), " ", next_subtask_app)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed pl-5"
  }, next_subtask)), conclude_final_answer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 p-2 bg-green-50 rounded border border-green-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83C\uDF89"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-green-700 font-medium"
  }, "Result")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-green-600"
  }, conclude_final_answer)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Analysis (", thoughts.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, getThoughtsSummary()), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, thoughts.map((thought, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-300 mt-0.5 font-mono"
  }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thought))))))));
}

/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/CardManager.css":
/*!**************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/CardManager.css ***!
  \**************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Card Manager Styles */\n.card-manager {\n  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);\n  border-radius: 12px;\n  border: 1px solid #cbd5e1;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  margin: 16px 0;\n  overflow: hidden;\n  transition: all 0.3s ease;\n  position: relative;\n}\n\n.card-manager.animating {\n  transform: scale(1.02);\n  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n}\n\n.card-header {\n  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);\n  color: white;\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n}\n\n.card-header::before {\n  content: '';\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 100%;\n  height: 200%;\n  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);\n  transform: rotate(45deg);\n  animation: shimmer 3s infinite;\n}\n\n@keyframes shimmer {\n  0% { transform: translateX(-100%) rotate(45deg); }\n  100% { transform: translateX(100%) rotate(45deg); }\n}\n\n.card-title h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.card-title h3::before {\n  content: '🤖';\n  font-size: 20px;\n}\n\n.step-counter {\n  font-size: 12px;\n  opacity: 0.9;\n  margin-top: 2px;\n  font-weight: 400;\n}\n\n.card-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.history-button {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(10px);\n}\n\n.history-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n}\n\n.card-content {\n  padding: 20px;\n  background: white;\n  min-height: 100px;\n}\n\n.step-item {\n  margin-bottom: 16px;\n  opacity: 0;\n  transform: translateY(20px);\n  animation: slideInUp 0.5s ease forwards;\n}\n\n.step-item.new-step {\n  animation: slideInUp 0.5s ease forwards, highlightPulse 2s ease 0.5s;\n}\n\n@keyframes slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes highlightPulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);\n  }\n  50% {\n    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);\n  }\n}\n\n.card-footer {\n  background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n  color: white;\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-top: 1px solid #d1fae5;\n}\n\n.completion-message {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.new-query-button {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(10px);\n}\n\n.new-query-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n}\n\n/* History Modal Styles */\n.history-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  backdrop-filter: blur(4px);\n  animation: fadeIn 0.3s ease;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.history-modal {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  max-width: 600px;\n  width: 90%;\n  max-height: 80vh;\n  overflow: hidden;\n  animation: slideInModal 0.3s ease;\n}\n\n@keyframes slideInModal {\n  from {\n    opacity: 0;\n    transform: scale(0.9) translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n\n.history-header {\n  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n  color: white;\n  padding: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.history-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n\n.history-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.clear-history-button,\n.close-history-button {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(10px);\n}\n\n.clear-history-button:hover,\n.close-history-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n\n.close-history-button {\n  padding: 6px;\n  font-size: 16px;\n  line-height: 1;\n}\n\n.history-content {\n  padding: 20px;\n  max-height: 60vh;\n  overflow-y: auto;\n}\n\n.no-history {\n  text-align: center;\n  color: #6b7280;\n  font-style: italic;\n  padding: 40px 20px;\n}\n\n.history-card {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  background: #f9fafb;\n  transition: all 0.2s ease;\n}\n\n.history-card:hover {\n  border-color: #3b82f6;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n\n.history-card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.history-card-title {\n  font-weight: 600;\n  color: #374151;\n  font-size: 14px;\n}\n\n.history-card-meta {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n.history-card-preview {\n  margin-bottom: 12px;\n}\n\n.history-step-preview {\n  font-size: 12px;\n  color: #4b5563;\n  margin-bottom: 4px;\n  padding-left: 8px;\n  border-left: 2px solid #e5e7eb;\n}\n\n.history-step-more {\n  font-size: 11px;\n  color: #9ca3af;\n  font-style: italic;\n  padding-left: 8px;\n  border-left: 2px solid #e5e7eb;\n}\n\n.restore-card-button {\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.restore-card-button:hover {\n  background: #2563eb;\n  transform: translateY(-1px);\n}\n\n/* In-Place Card Transitions */\n.current-step-container {\n  position: relative;\n  overflow: hidden;\n  min-height: 200px;\n  transition: min-height 0.3s ease-in-out;\n}\n\n/* No container animation – instant switch */\n\n.component-container.current-step {\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);\n  border-color: #3b82f6;\n  position: relative;\n  overflow: hidden;\n}\n\n/* Loading step with sliding border animation */\n/* Shared loading border lives on the persistent container so it continues across swaps */\n.current-step-container.loading-border::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent);\n  animation: borderSlide 2.5s ease-in-out infinite;\n  z-index: 1;\n}\n\n@keyframes borderSlide {\n  0% {\n    left: -100%;\n  }\n  100% {\n    left: 100%;\n  }\n}\n\n@keyframes borderSlideReverse {\n  0% {\n    right: -100%;\n  }\n  100% {\n    right: 100%;\n  }\n}\n\n/* No appear animation */\n\n/* Non-current steps rendered only in reasoning list; no fade */\n.component-container:not(.current-step) {}\n\n/* Reasoning Process Collapse Animation */\n.reasoning-section {\n  transition: all 0.5s ease-in-out;\n}\n\n.reasoning-content {\n  transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;\n  overflow: hidden;\n}\n\n.reasoning-content.collapsed {\n  max-height: 0;\n  opacity: 0;\n}\n\n.reasoning-content.expanded {\n  max-height: 2000px;\n  opacity: 1;\n}\n\n/* Step Fade Transitions */\n.step-fade-enter {\n  opacity: 0;\n  transform: translateY(20px);\n}\n\n.step-fade-enter-active {\n  opacity: 1;\n  transform: translateY(0);\n  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;\n}\n\n.step-fade-exit {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.step-fade-exit-active {\n  opacity: 0;\n  transform: translateY(-20px);\n  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;\n}\n\n/* Enhanced Card Hover Effects */\n.component-container:hover {\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n  transition: box-shadow 0.2s ease;\n}\n\n.component-container.current-step:hover {\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);\n}\n\n/* Smooth Loading Animation */\n.loading-shimmer {\n  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n\n@keyframes shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n\n/* Responsive Design */\n@media (max-width: 640px) {\n  .card-header {\n    flex-direction: column;\n    gap: 8px;\n    align-items: flex-start;\n  }\n  \n  .card-actions {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  \n  .history-modal {\n    width: 95%;\n    margin: 20px;\n  }\n  \n  .card-footer {\n    flex-direction: column;\n    gap: 12px;\n    align-items: stretch;\n  }\n  \n  .new-query-button {\n    width: 100%;\n  }\n  \n  .current-step-container.loading-border::before,\n  .current-step-container.loading-border::after {\n    display: none;\n  }\n  \n  .current-step-container {\n    min-height: 150px;\n  }\n}\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/CardManager.css"],"names":[],"mappings":"AAAA,wBAAwB;AACxB;EACE,6DAA6D;EAC7D,mBAAmB;EACnB,yBAAyB;EACzB,iFAAiF;EACjF,cAAc;EACd,gBAAgB;EAChB,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,oFAAoF;AACtF;;AAEA;EACE,6DAA6D;EAC7D,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,WAAW;EACX,YAAY;EACZ,sFAAsF;EACtF,wBAAwB;EACxB,8BAA8B;AAChC;;AAEA;EACE,KAAK,0CAA0C,EAAE;EACjD,OAAO,yCAAyC,EAAE;AACpD;;AAEA;EACE,SAAS;EACT,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,mBAAmB;AACrB;;AAEA;EACE,oCAAoC;EACpC,0CAA0C;EAC1C,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,yBAAyB;EACzB,2BAA2B;AAC7B;;AAEA;EACE,oCAAoC;EACpC,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,2BAA2B;EAC3B,uCAAuC;AACzC;;AAEA;EACE,oEAAoE;AACtE;;AAEA;EACE;IACE,UAAU;IACV,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,wBAAwB;EAC1B;AACF;;AAEA;EACE;IACE,2CAA2C;EAC7C;EACA;IACE,6CAA6C;EAC/C;AACF;;AAEA;EACE,6DAA6D;EAC7D,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,oCAAoC;EACpC,0CAA0C;EAC1C,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,yBAAyB;EACzB,2BAA2B;AAC7B;;AAEA;EACE,oCAAoC;EACpC,2BAA2B;AAC7B;;AAEA,yBAAyB;AACzB;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,0BAA0B;EAC1B,2BAA2B;AAC7B;;AAEA;EACE,OAAO,UAAU,EAAE;EACnB,KAAK,UAAU,EAAE;AACnB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,iDAAiD;EACjD,gBAAgB;EAChB,UAAU;EACV,gBAAgB;EAChB,gBAAgB;EAChB,iCAAiC;AACnC;;AAEA;EACE;IACE,UAAU;IACV,uCAAuC;EACzC;EACA;IACE,UAAU;IACV,iCAAiC;EACnC;AACF;;AAEA;EACE,6DAA6D;EAC7D,YAAY;EACZ,aAAa;EACb,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,mBAAmB;AACrB;;AAEA;;EAEE,oCAAoC;EACpC,0CAA0C;EAC1C,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,yBAAyB;EACzB,2BAA2B;AAC7B;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;EACrB,6CAA6C;EAC7C,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,8BAA8B;AAChC;;AAEA;EACE,eAAe;EACf,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,8BAA8B;AAChC;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA,8BAA8B;AAC9B;EACE,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,uCAAuC;AACzC;;AAEA,4CAA4C;;AAE5C;EACE,+CAA+C;EAC/C,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA,+CAA+C;AAC/C,yFAAyF;AACzF;EACE,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,WAAW;EACX,WAAW;EACX,WAAW;EACX,8EAA8E;EAC9E,gDAAgD;EAChD,UAAU;AACZ;;AAEA;EACE;IACE,WAAW;EACb;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,YAAY;EACd;EACA;IACE,WAAW;EACb;AACF;;AAEA,wBAAwB;;AAExB,+DAA+D;AAC/D,yCAAyC;;AAEzC,yCAAyC;AACzC;EACE,gCAAgC;AAClC;;AAEA;EACE,iEAAiE;EACjE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,UAAU;AACZ;;AAEA,0BAA0B;AAC1B;EACE,UAAU;EACV,2BAA2B;AAC7B;;AAEA;EACE,UAAU;EACV,wBAAwB;EACxB,gEAAgE;AAClE;;AAEA;EACE,UAAU;EACV,wBAAwB;AAC1B;;AAEA;EACE,UAAU;EACV,4BAA4B;EAC5B,gEAAgE;AAClE;;AAEA,gCAAgC;AAChC;EACE,yCAAyC;EACzC,gCAAgC;AAClC;;AAEA;EACE,8CAA8C;AAChD;;AAEA,6BAA6B;AAC7B;EACE,yEAAyE;EACzE,0BAA0B;EAC1B,gCAAgC;AAClC;;AAEA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,2BAA2B;EAC7B;AACF;;AAEA,sBAAsB;AACtB;EACE;IACE,sBAAsB;IACtB,QAAQ;IACR,uBAAuB;EACzB;;EAEA;IACE,WAAW;IACX,yBAAyB;EAC3B;;EAEA;IACE,UAAU;IACV,YAAY;EACd;;EAEA;IACE,sBAAsB;IACtB,SAAS;IACT,oBAAoB;EACtB;;EAEA;IACE,WAAW;EACb;;EAEA;;IAEE,aAAa;EACf;;EAEA;IACE,iBAAiB;EACnB;AACF","sourcesContent":["/* Card Manager Styles */\n.card-manager {\n  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);\n  border-radius: 12px;\n  border: 1px solid #cbd5e1;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  margin: 16px 0;\n  overflow: hidden;\n  transition: all 0.3s ease;\n  position: relative;\n}\n\n.card-manager.animating {\n  transform: scale(1.02);\n  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n}\n\n.card-header {\n  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);\n  color: white;\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n}\n\n.card-header::before {\n  content: '';\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 100%;\n  height: 200%;\n  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);\n  transform: rotate(45deg);\n  animation: shimmer 3s infinite;\n}\n\n@keyframes shimmer {\n  0% { transform: translateX(-100%) rotate(45deg); }\n  100% { transform: translateX(100%) rotate(45deg); }\n}\n\n.card-title h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.card-title h3::before {\n  content: '🤖';\n  font-size: 20px;\n}\n\n.step-counter {\n  font-size: 12px;\n  opacity: 0.9;\n  margin-top: 2px;\n  font-weight: 400;\n}\n\n.card-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.history-button {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(10px);\n}\n\n.history-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n}\n\n.card-content {\n  padding: 20px;\n  background: white;\n  min-height: 100px;\n}\n\n.step-item {\n  margin-bottom: 16px;\n  opacity: 0;\n  transform: translateY(20px);\n  animation: slideInUp 0.5s ease forwards;\n}\n\n.step-item.new-step {\n  animation: slideInUp 0.5s ease forwards, highlightPulse 2s ease 0.5s;\n}\n\n@keyframes slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes highlightPulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);\n  }\n  50% {\n    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);\n  }\n}\n\n.card-footer {\n  background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n  color: white;\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-top: 1px solid #d1fae5;\n}\n\n.completion-message {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.new-query-button {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(10px);\n}\n\n.new-query-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n}\n\n/* History Modal Styles */\n.history-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  backdrop-filter: blur(4px);\n  animation: fadeIn 0.3s ease;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.history-modal {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  max-width: 600px;\n  width: 90%;\n  max-height: 80vh;\n  overflow: hidden;\n  animation: slideInModal 0.3s ease;\n}\n\n@keyframes slideInModal {\n  from {\n    opacity: 0;\n    transform: scale(0.9) translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n\n.history-header {\n  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n  color: white;\n  padding: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.history-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n\n.history-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.clear-history-button,\n.close-history-button {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(10px);\n}\n\n.clear-history-button:hover,\n.close-history-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n\n.close-history-button {\n  padding: 6px;\n  font-size: 16px;\n  line-height: 1;\n}\n\n.history-content {\n  padding: 20px;\n  max-height: 60vh;\n  overflow-y: auto;\n}\n\n.no-history {\n  text-align: center;\n  color: #6b7280;\n  font-style: italic;\n  padding: 40px 20px;\n}\n\n.history-card {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  background: #f9fafb;\n  transition: all 0.2s ease;\n}\n\n.history-card:hover {\n  border-color: #3b82f6;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n\n.history-card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.history-card-title {\n  font-weight: 600;\n  color: #374151;\n  font-size: 14px;\n}\n\n.history-card-meta {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n.history-card-preview {\n  margin-bottom: 12px;\n}\n\n.history-step-preview {\n  font-size: 12px;\n  color: #4b5563;\n  margin-bottom: 4px;\n  padding-left: 8px;\n  border-left: 2px solid #e5e7eb;\n}\n\n.history-step-more {\n  font-size: 11px;\n  color: #9ca3af;\n  font-style: italic;\n  padding-left: 8px;\n  border-left: 2px solid #e5e7eb;\n}\n\n.restore-card-button {\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.restore-card-button:hover {\n  background: #2563eb;\n  transform: translateY(-1px);\n}\n\n/* In-Place Card Transitions */\n.current-step-container {\n  position: relative;\n  overflow: hidden;\n  min-height: 200px;\n  transition: min-height 0.3s ease-in-out;\n}\n\n/* No container animation – instant switch */\n\n.component-container.current-step {\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);\n  border-color: #3b82f6;\n  position: relative;\n  overflow: hidden;\n}\n\n/* Loading step with sliding border animation */\n/* Shared loading border lives on the persistent container so it continues across swaps */\n.current-step-container.loading-border::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent);\n  animation: borderSlide 2.5s ease-in-out infinite;\n  z-index: 1;\n}\n\n@keyframes borderSlide {\n  0% {\n    left: -100%;\n  }\n  100% {\n    left: 100%;\n  }\n}\n\n@keyframes borderSlideReverse {\n  0% {\n    right: -100%;\n  }\n  100% {\n    right: 100%;\n  }\n}\n\n/* No appear animation */\n\n/* Non-current steps rendered only in reasoning list; no fade */\n.component-container:not(.current-step) {}\n\n/* Reasoning Process Collapse Animation */\n.reasoning-section {\n  transition: all 0.5s ease-in-out;\n}\n\n.reasoning-content {\n  transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;\n  overflow: hidden;\n}\n\n.reasoning-content.collapsed {\n  max-height: 0;\n  opacity: 0;\n}\n\n.reasoning-content.expanded {\n  max-height: 2000px;\n  opacity: 1;\n}\n\n/* Step Fade Transitions */\n.step-fade-enter {\n  opacity: 0;\n  transform: translateY(20px);\n}\n\n.step-fade-enter-active {\n  opacity: 1;\n  transform: translateY(0);\n  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;\n}\n\n.step-fade-exit {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.step-fade-exit-active {\n  opacity: 0;\n  transform: translateY(-20px);\n  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;\n}\n\n/* Enhanced Card Hover Effects */\n.component-container:hover {\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n  transition: box-shadow 0.2s ease;\n}\n\n.component-container.current-step:hover {\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);\n}\n\n/* Smooth Loading Animation */\n.loading-shimmer {\n  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n\n@keyframes shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n\n/* Responsive Design */\n@media (max-width: 640px) {\n  .card-header {\n    flex-direction: column;\n    gap: 8px;\n    align-items: flex-start;\n  }\n  \n  .card-actions {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  \n  .history-modal {\n    width: 95%;\n    margin: 20px;\n  }\n  \n  .card-footer {\n    flex-direction: column;\n    gap: 12px;\n    align-items: stretch;\n  }\n  \n  .new-query-button {\n    width: 100%;\n  }\n  \n  .current-step-container.loading-border::before,\n  .current-step-container.loading-border::after {\n    display: none;\n  }\n  \n  .current-step-container {\n    min-height: 150px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/CustomResponseStyles.css":
/*!***********************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/CustomResponseStyles.css ***!
  \***********************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".external {\n  background: green;\n  color: #fff;\n  padding: 1rem;\n}\n\n/* Main container styles */\n.ai-system-steps {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\",\n    \"Helvetica Neue\", sans-serif;\n  max-width: 800px;\n  margin: 0 auto;\n  padding-left: 0px !important;\n  padding-right: 10px;\n}\n\n/* .new-step {\n  animation: fadeIn 0.8s ease-out;\n  opacity: 1;\n} */\n\n/* @keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n} */\n\n/* Main title */\n.system-title {\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-bottom: 20px;\n  color: #333;\n}\n\n/* Steps container */\n.steps-container {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n/* Individual step */\n.step {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n}\n\n.step.expanded {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n\n/* Step header */\n.step-header {\n  padding: 12px 16px;\n  background-color: #f5f7f9;\n  display: flex;\n  justify-content: space-between;\n  /* align-items: center; */\n  transition: background-color 0.2s ease;\n}\n\n.step-header:hover {\n  background-color: #edf0f3;\n}\n\n/* Title container to group title and expand button */\n.title-container {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n}\n\n/* Step title styling */\n.step-title {\n  font-style: italic;\n  font-weight: 500;\n  color: #333;\n  flex-grow: 1;\n}\n\n/* Expand button styling */\n.expand-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #555;\n  padding: 4px;\n  border-radius: 50%;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n\n.expand-button:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n  color: #222;\n}\n\n/* Step content */\n.step-content {\n  padding: 16px;\n  overflow-x: scroll;\n  background-color: white;\n  line-height: 1.5;\n}\n\n/* Styles for the stop button container to ensure it's always visible */\n.stop-button-container {\n  position: sticky;\n  bottom: 0;\n  opacity: 1;\n  background-color: rgba(255, 255, 255, 0);\n  padding: 8px 0;\n  border-top: 0px solid #e0e0e0;\n  z-index: 100;\n  width: 100%;\n  text-align: center;\n}\n\n.stop-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  background-color: #ff4d4d;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: bold;\n  margin: 0 auto;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  transition: all 0.2s ease;\n}\n\n.stop-button:hover {\n  background-color: #ff3333;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);\n}\n\n.stop-button:disabled {\n  background-color: #cccccc;\n  cursor: default;\n  box-shadow: none;\n}\n\n.stop-button svg {\n  margin-right: 8px;\n}\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/CustomResponseStyles.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,WAAW;EACX,aAAa;AACf;;AAEA,0BAA0B;AAC1B;EACE;gCAC8B;EAC9B,gBAAgB;EAChB,cAAc;EACd,4BAA4B;EAC5B,mBAAmB;AACrB;;AAEA;;;GAGG;;AAEH;;;;;;;;;GASG;;AAEH,eAAe;AACf;EACE,iBAAiB;EACjB,iBAAiB;EACjB,mBAAmB;EACnB,WAAW;AACb;;AAEA,oBAAoB;AACpB;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA,oBAAoB;AACpB;EACE,yBAAyB;EACzB,kBAAkB;EAClB,gBAAgB;EAChB,yCAAyC;EACzC,yBAAyB;AAC3B;;AAEA;EACE,wCAAwC;AAC1C;;AAEA,gBAAgB;AAChB;EACE,kBAAkB;EAClB,yBAAyB;EACzB,aAAa;EACb,8BAA8B;EAC9B,yBAAyB;EACzB,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,qDAAqD;AACrD;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,WAAW;AACb;;AAEA,uBAAuB;AACvB;EACE,kBAAkB;EAClB,gBAAgB;EAChB,WAAW;EACX,YAAY;AACd;;AAEA,0BAA0B;AAC1B;EACE,gBAAgB;EAChB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,uDAAuD;AACzD;;AAEA;EACE,qCAAqC;EACrC,WAAW;AACb;;AAEA,iBAAiB;AACjB;EACE,aAAa;EACb,kBAAkB;EAClB,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA,uEAAuE;AACvE;EACE,gBAAgB;EAChB,SAAS;EACT,UAAU;EACV,wCAAwC;EACxC,cAAc;EACd,6BAA6B;EAC7B,YAAY;EACZ,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;EACjB,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,cAAc;EACd,wCAAwC;EACxC,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,wCAAwC;AAC1C;;AAEA;EACE,yBAAyB;EACzB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;AACnB","sourcesContent":[".external {\n  background: green;\n  color: #fff;\n  padding: 1rem;\n}\n\n/* Main container styles */\n.ai-system-steps {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\",\n    \"Helvetica Neue\", sans-serif;\n  max-width: 800px;\n  margin: 0 auto;\n  padding-left: 0px !important;\n  padding-right: 10px;\n}\n\n/* .new-step {\n  animation: fadeIn 0.8s ease-out;\n  opacity: 1;\n} */\n\n/* @keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n} */\n\n/* Main title */\n.system-title {\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-bottom: 20px;\n  color: #333;\n}\n\n/* Steps container */\n.steps-container {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n/* Individual step */\n.step {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n}\n\n.step.expanded {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n\n/* Step header */\n.step-header {\n  padding: 12px 16px;\n  background-color: #f5f7f9;\n  display: flex;\n  justify-content: space-between;\n  /* align-items: center; */\n  transition: background-color 0.2s ease;\n}\n\n.step-header:hover {\n  background-color: #edf0f3;\n}\n\n/* Title container to group title and expand button */\n.title-container {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n}\n\n/* Step title styling */\n.step-title {\n  font-style: italic;\n  font-weight: 500;\n  color: #333;\n  flex-grow: 1;\n}\n\n/* Expand button styling */\n.expand-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #555;\n  padding: 4px;\n  border-radius: 50%;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n\n.expand-button:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n  color: #222;\n}\n\n/* Step content */\n.step-content {\n  padding: 16px;\n  overflow-x: scroll;\n  background-color: white;\n  line-height: 1.5;\n}\n\n/* Styles for the stop button container to ensure it's always visible */\n.stop-button-container {\n  position: sticky;\n  bottom: 0;\n  opacity: 1;\n  background-color: rgba(255, 255, 255, 0);\n  padding: 8px 0;\n  border-top: 0px solid #e0e0e0;\n  z-index: 100;\n  width: 100%;\n  text-align: center;\n}\n\n.stop-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  background-color: #ff4d4d;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: bold;\n  margin: 0 auto;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  transition: all 0.2s ease;\n}\n\n.stop-button:hover {\n  background-color: #ff3333;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);\n}\n\n.stop-button:disabled {\n  background-color: #cccccc;\n  cursor: default;\n  box-shadow: none;\n}\n\n.stop-button svg {\n  margin-right: 8px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablePopup.css":
/*!****************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablePopup.css ***!
  \****************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".variable-popup-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10000;\n  animation: fadeIn 0.2s ease-in-out;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.variable-popup-content {\n  background: white;\n  border-radius: 12px;\n  max-width: 700px;\n  width: 90%;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  animation: slideUp 0.3s ease-out;\n}\n\n@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.variable-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.variable-popup-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.variable-popup-download-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #4e00ec;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-popup-download-btn:hover {\n  background: #3d00b8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(78, 0, 236, 0.3);\n}\n\n.variable-popup-download-btn:active {\n  transform: translateY(0);\n}\n\n.variable-popup-close-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  font-size: 28px;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: all 0.2s;\n  line-height: 1;\n}\n\n.variable-popup-close-btn:hover {\n  background: #f1f5f9;\n  color: #1e293b;\n}\n\n.variable-popup-body {\n  padding: 24px;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.variable-popup-body h2 {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-body p {\n  margin: 8px 0;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.variable-popup-body strong {\n  color: #1e293b;\n  font-weight: 600;\n}\n\n.variable-popup-body code {\n  background: #f1f5f9;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 13px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  color: #4e00ec;\n}\n\n.variable-popup-body pre {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n  overflow-x: auto;\n  margin: 12px 0;\n}\n\n.variable-popup-body pre code {\n  background: transparent;\n  padding: 0;\n  color: #334155;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/VariablePopup.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,cAAc;EACd,kCAAkC;AACpC;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,gBAAgB;EAChB,UAAU;EACV,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,gCAAgC;AAClC;;AAEA;EACE;IACE,2BAA2B;IAC3B,UAAU;EACZ;EACA;IACE,wBAAwB;IACxB,UAAU;EACZ;AACF;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;EAC3B,4CAA4C;AAC9C;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,YAAY;EACZ,eAAe;EACf,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,oBAAoB;EACpB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,OAAO;AACT;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,wDAAwD;EACxD,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,uBAAuB;EACvB,UAAU;EACV,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB","sourcesContent":[".variable-popup-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10000;\n  animation: fadeIn 0.2s ease-in-out;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.variable-popup-content {\n  background: white;\n  border-radius: 12px;\n  max-width: 700px;\n  width: 90%;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  animation: slideUp 0.3s ease-out;\n}\n\n@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.variable-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.variable-popup-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.variable-popup-download-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #4e00ec;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-popup-download-btn:hover {\n  background: #3d00b8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(78, 0, 236, 0.3);\n}\n\n.variable-popup-download-btn:active {\n  transform: translateY(0);\n}\n\n.variable-popup-close-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  font-size: 28px;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: all 0.2s;\n  line-height: 1;\n}\n\n.variable-popup-close-btn:hover {\n  background: #f1f5f9;\n  color: #1e293b;\n}\n\n.variable-popup-body {\n  padding: 24px;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.variable-popup-body h2 {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-body p {\n  margin: 8px 0;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.variable-popup-body strong {\n  color: #1e293b;\n  font-weight: 600;\n}\n\n.variable-popup-body code {\n  background: #f1f5f9;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 13px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  color: #4e00ec;\n}\n\n.variable-popup-body pre {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n  overflow-x: auto;\n  margin: 12px 0;\n}\n\n.variable-popup-body pre code {\n  background: transparent;\n  padding: 0;\n  color: #334155;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablesSidebar.css":
/*!*******************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablesSidebar.css ***!
  \*******************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Ensure sidebar is fixed from the very left edge */\n.variables-sidebar {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0;\n  bottom: 0;\n  background: white;\n  border-right: 1px solid #e5e7eb;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  transition: width 0.3s ease, transform 0.3s ease;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);\n  margin: 0;\n  padding: 0;\n}\n\n.variables-sidebar.expanded {\n  width: 320px;\n}\n\n.variables-sidebar.collapsed {\n  /* When collapsed, slide it completely out of view */\n  transform: translateX(-100%);\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .variables-sidebar.expanded {\n    width: 280px;\n  }\n}\n\n@media (max-width: 640px) {\n  .variables-sidebar.expanded {\n    width: 100%;\n    max-width: 300px;\n  }\n  \n  .variables-sidebar.collapsed {\n    transform: translateX(-100%);\n  }\n}\n\n.variables-sidebar-header {\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  border-bottom: 1px solid #e5e7eb;\n  gap: 12px;\n  min-height: 64px;\n  flex-wrap: wrap;\n}\n\n.variables-sidebar-toggle {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.variables-sidebar-toggle:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #4e00ec;\n}\n\n.variables-sidebar.collapsed .variables-sidebar-toggle {\n  margin: 0 auto;\n}\n\n.variables-sidebar-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n  flex: 1;\n}\n\n.variables-sidebar-title svg {\n  color: #4e00ec;\n}\n\n.variables-count {\n  background: #4e00ec;\n  color: white;\n  font-size: 12px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 12px;\n  margin-left: auto;\n}\n\n.variables-history-select {\n  width: 100%;\n  padding: 6px 10px;\n  font-size: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: white;\n  color: #1e293b;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-top: 8px;\n}\n\n.variables-history-select:hover {\n  border-color: #cbd5e1;\n  background: #f8fafc;\n}\n\n.variables-history-select:focus {\n  outline: none;\n  border-color: #4e00ec;\n  box-shadow: 0 0 0 3px rgba(78, 0, 236, 0.1);\n}\n\n.variables-history-info {\n  padding: 10px 12px;\n  background: #f8fafc;\n  border-bottom: 1px solid #e5e7eb;\n  font-size: 12px;\n  color: #64748b;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.history-count {\n  font-weight: 600;\n  color: #4e00ec;\n}\n\n.variables-sidebar-content {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.variables-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n}\n\n.variable-item {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-item:hover {\n  background: #f1f5f9;\n  border-color: #cbd5e1;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(78, 0, 236, 0.1);\n}\n\n.variable-item:active {\n  transform: translateY(0);\n}\n\n.variable-item-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-name {\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  font-size: 13px;\n  font-weight: 600;\n  color: #4e00ec;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5dbff;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.variable-type {\n  font-size: 11px;\n  font-weight: 500;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n\n.variable-description {\n  font-size: 12px;\n  color: #64748b;\n  line-height: 1.4;\n  margin-bottom: 6px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.variable-meta {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.variable-preview {\n  font-size: 12px;\n  color: #475569;\n  background: white;\n  padding: 6px 8px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: 1.4;\n}\n\n/* Scrollbar styling */\n.variables-sidebar-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Animation */\n@keyframes slideIn {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n\n.variables-sidebar {\n  animation: slideIn 0.3s ease-out;\n}\n\n/* Floating toggle button when sidebar is collapsed */\n.variables-sidebar-floating-toggle {\n  position: fixed;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 64px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-left: none;\n  border-radius: 0 8px 8px 0;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  z-index: 999;\n  transition: all 0.2s;\n  color: #64748b;\n}\n\n.variables-sidebar-floating-toggle:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n  box-shadow: 2px 0 12px rgba(78, 0, 236, 0.2);\n}\n\n.variables-floating-count {\n  font-size: 11px;\n  font-weight: 600;\n  background: #4e00ec;\n  color: white;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 20px;\n  text-align: center;\n}\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/VariablesSidebar.css"],"names":[],"mappings":"AAAA,oDAAoD;AACpD;EACE,0BAA0B;EAC1B,kBAAkB;EAClB,MAAM;EACN,SAAS;EACT,iBAAiB;EACjB,+BAA+B;EAC/B,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,gDAAgD;EAChD,yCAAyC;EACzC,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,oDAAoD;EACpD,4BAA4B;AAC9B;;AAEA,sBAAsB;AACtB;EACE;IACE,YAAY;EACd;AACF;;AAEA;EACE;IACE,WAAW;IACX,gBAAgB;EAClB;;EAEA;IACE,4BAA4B;EAC9B;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,aAAa;EACb,gCAAgC;EAChC,SAAS;EACT,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,oBAAoB;EACpB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,OAAO;AACT;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,eAAe;EACf,gBAAgB;EAChB,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,eAAe;EACf,yBAAyB;EACzB,kBAAkB;EAClB,iBAAiB;EACjB,cAAc;EACd,eAAe;EACf,oBAAoB;EACpB,eAAe;AACjB;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,2CAA2C;AAC7C;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,gCAAgC;EAChC,eAAe;EACf,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,2BAA2B;EAC3B,2CAA2C;AAC7C;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,QAAQ;EACR,kBAAkB;AACpB;;AAEA;EACE,wDAAwD;EACxD,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,OAAO;EACP,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;EACpB,qBAAqB;EACrB,4BAA4B;EAC5B,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,wDAAwD;EACxD,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA,sBAAsB;AACtB;EACE,UAAU;AACZ;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA,cAAc;AACd;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,gCAAgC;AAClC;;AAEA,qDAAqD;AACrD;EACE,eAAe;EACf,OAAO;EACP,QAAQ;EACR,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,yBAAyB;EACzB,iBAAiB;EACjB,0BAA0B;EAC1B,wCAAwC;EACxC,eAAe;EACf,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;EACR,YAAY;EACZ,oBAAoB;EACpB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,cAAc;EACd,4CAA4C;AAC9C;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,mBAAmB;EACnB,YAAY;EACZ,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,kBAAkB;AACpB","sourcesContent":["/* Ensure sidebar is fixed from the very left edge */\n.variables-sidebar {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0;\n  bottom: 0;\n  background: white;\n  border-right: 1px solid #e5e7eb;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  transition: width 0.3s ease, transform 0.3s ease;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);\n  margin: 0;\n  padding: 0;\n}\n\n.variables-sidebar.expanded {\n  width: 320px;\n}\n\n.variables-sidebar.collapsed {\n  /* When collapsed, slide it completely out of view */\n  transform: translateX(-100%);\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .variables-sidebar.expanded {\n    width: 280px;\n  }\n}\n\n@media (max-width: 640px) {\n  .variables-sidebar.expanded {\n    width: 100%;\n    max-width: 300px;\n  }\n  \n  .variables-sidebar.collapsed {\n    transform: translateX(-100%);\n  }\n}\n\n.variables-sidebar-header {\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  border-bottom: 1px solid #e5e7eb;\n  gap: 12px;\n  min-height: 64px;\n  flex-wrap: wrap;\n}\n\n.variables-sidebar-toggle {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.variables-sidebar-toggle:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #4e00ec;\n}\n\n.variables-sidebar.collapsed .variables-sidebar-toggle {\n  margin: 0 auto;\n}\n\n.variables-sidebar-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n  flex: 1;\n}\n\n.variables-sidebar-title svg {\n  color: #4e00ec;\n}\n\n.variables-count {\n  background: #4e00ec;\n  color: white;\n  font-size: 12px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 12px;\n  margin-left: auto;\n}\n\n.variables-history-select {\n  width: 100%;\n  padding: 6px 10px;\n  font-size: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: white;\n  color: #1e293b;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-top: 8px;\n}\n\n.variables-history-select:hover {\n  border-color: #cbd5e1;\n  background: #f8fafc;\n}\n\n.variables-history-select:focus {\n  outline: none;\n  border-color: #4e00ec;\n  box-shadow: 0 0 0 3px rgba(78, 0, 236, 0.1);\n}\n\n.variables-history-info {\n  padding: 10px 12px;\n  background: #f8fafc;\n  border-bottom: 1px solid #e5e7eb;\n  font-size: 12px;\n  color: #64748b;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.history-count {\n  font-weight: 600;\n  color: #4e00ec;\n}\n\n.variables-sidebar-content {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.variables-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n}\n\n.variable-item {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-item:hover {\n  background: #f1f5f9;\n  border-color: #cbd5e1;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(78, 0, 236, 0.1);\n}\n\n.variable-item:active {\n  transform: translateY(0);\n}\n\n.variable-item-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-name {\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  font-size: 13px;\n  font-weight: 600;\n  color: #4e00ec;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5dbff;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.variable-type {\n  font-size: 11px;\n  font-weight: 500;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n\n.variable-description {\n  font-size: 12px;\n  color: #64748b;\n  line-height: 1.4;\n  margin-bottom: 6px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.variable-meta {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.variable-preview {\n  font-size: 12px;\n  color: #475569;\n  background: white;\n  padding: 6px 8px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: 1.4;\n}\n\n/* Scrollbar styling */\n.variables-sidebar-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Animation */\n@keyframes slideIn {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n\n.variables-sidebar {\n  animation: slideIn 0.3s ease-out;\n}\n\n/* Floating toggle button when sidebar is collapsed */\n.variables-sidebar-floating-toggle {\n  position: fixed;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 64px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-left: none;\n  border-radius: 0 8px 8px 0;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  z-index: 999;\n  transition: all 0.2s;\n  color: #64748b;\n}\n\n.variables-sidebar-floating-toggle:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n  box-shadow: 2px 0 12px rgba(78, 0, 236, 0.2);\n}\n\n.variables-floating-count {\n  font-size: 11px;\n  font-weight: 600;\n  background: #4e00ec;\n  color: white;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 20px;\n  text-align: center;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WriteableElementExample.css":
/*!**************************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WriteableElementExample.css ***!
  \**************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.101.3/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_3_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".floating-toggle {\n  width: fit-content;\n  margin-bottom: 6px;\n  top: 20px;\n  right: 20px;\n  background: #e0f2fe;\n  border-radius: 20px;\n  border: 1px solid #b3e5fc;\n  cursor: pointer;\n  z-index: 1000;\n  transition: all 0.2s ease;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  user-select: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  height: 32px;\n  box-sizing: border-box;\n}\n\n.floating-toggle:hover {\n  background: #b3e5fc;\n  transform: translateY(-1px);\n}\n\n.toggle-icon {\n  font-size: 14px;\n  line-height: 1;\n}\n\n.toggle-text {\n  font-size: 12px;\n  font-weight: 500;\n  color: #0277bd;\n  line-height: 1;\n}\n\n/* Mobile positioning */\n@media (max-width: 768px) {\n  .floating-toggle {\n    top: 15px;\n    right: 15px;\n    height: 30px;\n    padding: 5px 10px;\n  }\n\n  .toggle-icon {\n    font-size: 13px;\n  }\n\n  .toggle-text {\n    font-size: 11px;\n  }\n}\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/WriteableElementExample.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,mBAAmB;EACnB,mBAAmB;EACnB,yBAAyB;EACzB,eAAe;EACf,aAAa;EACb,yBAAyB;EACzB,8EAA8E;EAC9E,iBAAiB;EACjB,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;EACjB,YAAY;EACZ,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,cAAc;AAChB;;AAEA,uBAAuB;AACvB;EACE;IACE,SAAS;IACT,WAAW;IACX,YAAY;IACZ,iBAAiB;EACnB;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,eAAe;EACjB;AACF","sourcesContent":[".floating-toggle {\n  width: fit-content;\n  margin-bottom: 6px;\n  top: 20px;\n  right: 20px;\n  background: #e0f2fe;\n  border-radius: 20px;\n  border: 1px solid #b3e5fc;\n  cursor: pointer;\n  z-index: 1000;\n  transition: all 0.2s ease;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  user-select: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  height: 32px;\n  box-sizing: border-box;\n}\n\n.floating-toggle:hover {\n  background: #b3e5fc;\n  transform: translateY(-1px);\n}\n\n.toggle-icon {\n  font-size: 14px;\n  line-height: 1;\n}\n\n.toggle-text {\n  font-size: 12px;\n  font-weight: 500;\n  color: #0277bd;\n  line-height: 1;\n}\n\n/* Mobile positioning */\n@media (max-width: 768px) {\n  .floating-toggle {\n    top: 15px;\n    right: 15px;\n    height: 30px;\n    padding: 5px 10px;\n  }\n\n  .toggle-icon {\n    font-size: 13px;\n  }\n\n  .toggle-text {\n    font-size: 11px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/client.js");
/* harmony import */ var agentic_chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! agentic_chat */ "../agentic_chat/src/App.tsx");



function renderApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element with id 'root' not found in index.html");
  }
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootElement);
  root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(agentic_chat__WEBPACK_IMPORTED_MODULE_2__.App, null));
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderApp);
} else {
  renderApp();
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	!function() {
/******/ 		var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });
/******/ 			}
/******/ 			def['default'] = function() { return value; };
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = function() { return Promise.resolve(); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_carbon_ai_chat_examples_web_components_basic"] = self["webpackChunk_carbon_ai_chat_examples_web_components_basic"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/App.tsx"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.2a6c1fc12b745ac28c7e.js.map