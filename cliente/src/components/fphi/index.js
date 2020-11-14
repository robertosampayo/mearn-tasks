import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FacePhiSelphi, FPhiSelphiConstants } from "facephi-selphi-react";

const Facephi = ({ }) => {


    const FPhiCameraResolutions = {
        res480p: { title: "640x480", width: 640, height: 480 },
        res600p: { title: "800x600", width: 800, height: 600 },
        res768p: { title: "1024x768", width: 1024, height: 768 },
        res720p: { title: "1280x720 (720p)", width: 1280, height: 720 },
        res1080p: { title: "1920x1080 (1080p)", width: 1920, height: 1080 },
      };

    const [state, setState] = useState({

        isWidgetCaptureStarted: false,

        widgetExtractionMode: FPhiSelphiConstants.ExtractionMode.Authenticate,
        widgetLivenessMode: FPhiSelphiConstants.LivenessMode.Blink,
        widgetInteractible: true,
        widgetTutorial: false,
        widgetStabilizationStage: false,
        widgetDebugMode: false,
        widgetCameraResolution: "res720p",
  
        widgetCameraWidth: FPhiCameraResolutions.res720p.width,
        widgetCameraHeight: FPhiCameraResolutions.res720p.height

    });




    return (

        <React.Fragment>
            <div className="facephi container p-3" >
              <div className="row h-100">
                <div className="facephi__component col-12 col-md-9" style={{ minHeight: 550 }}>
                {state.isWidgetCaptureStarted &&
                    <FacePhiSelphi widgetLibPath={`${process.env.PUBLIC_URL}assets/selphi`}
                        className="h-100"

                        language="es"
                        extractionMode={state.widgetExtractionMode}
                        livenessMode={state.widgetLivenessMode}

                        cameraWidth={state.widgetCameraWidth}
                        cameraHeight={state.widgetCameraHeight}

                        interactible={state.widgetInteractible}
                        tutorial={state.widgetTutorial}
                        stabilizationStage={state.widgetStabilizationStage}
                        
                        logImages={true}
                        cropFactor={1.7}
                        debugMode={state.widgetDebugMode}

                        onModuleLoaded={onModuleLoaded}
                        onStabilizing={onStabilizing}
                        onExtractionFinish={onExtractionFinish}
                        onUserCancel={onUserCancel}
                        onExceptionCaptured={onExceptionCaptured}
                        onLivenessError={onLivenessError}
                        onLivenessErrorButtonClick={onLivenessErrorButtonClick}
                        onExtractionTimeout={onExtractionTimeout}
                        onTimeoutErrorButtonClick={onTimeoutErrorButtonClick}>
                    </FacePhiSelphi>
                }
                </div>
                <div className='col-12 col-md-3 mt-3 mt-md-0'>
                    <div className="form-group">
                      <label htmlFor="widgetExtractionMode">Extraction mode</label>
                      <select id="widgetExtractionMode" className="form-control" value={state.widgetExtractionMode} onChange={handleInputChange} disabled={state.isWidgetCaptureStarted}>
                        {Object.entries(FPhiSelphiConstants.ExtractionMode)
                          .map(mode => ({ key: mode[0], value: mode[1] }))
                          .map(mode => <option value={mode.value} key={mode.value}>{mode.key}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="widgetLivenessMode">Liveness mode</label>
                      <select id="widgetLivenessMode" className="form-control" value={state.widgetLivenessMode} onChange={handleInputChange} disabled={state.isWidgetCaptureStarted}>
                        {Object.entries(FPhiSelphiConstants.LivenessMode)
                          .map(mode => ({ key: mode[0], value: mode[1] }))
                          .map(mode => <option value={mode.value} key={mode.value}>{mode.key}</option>)}
                      </select>
                    </div>
                    <div className="form-group form-check m-0">
                      <input type="checkbox" id="widgetInteractible" className="form-check-input" checked={state.widgetInteractible} onChange={handleInputChange} disabled={state.isWidgetCaptureStarted} />
                      <label htmlFor="widgetInteractible" className="form-check-label">Interactible</label>
                    </div>
                    <div className="form-group form-check m-0">
                      <input type="checkbox" id="widgetTutorial" className="form-check-input" checked={state.widgetTutorial} onChange={handleInputChange} disabled={state.isWidgetCaptureStarted} />
                      <label htmlFor="widgetTutorial" className="form-check-label">Tutorial</label>
                    </div>
                    <div className="form-group form-check m-0">
                      <input type="checkbox" id="widgetStabilizationStage" className="form-check-input" checked={state.widgetStabilizationStage} onChange={handleInputChange} disabled={state.isWidgetCaptureStarted} />
                      <label htmlFor="widgetStabilizationStage" className="form-check-label">Stabilization Stage</label>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" id="widgetDebugMode" className="form-check-input" checked={state.widgetDebugMode} onChange={handleInputChange} disabled={state.isWidgetCaptureStarted} />
                      <label htmlFor="widgetDebugMode" className="form-check-label">Debug</label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="widgetCameraResolution">Camera resolution</label>
                      <select id="widgetCameraResolution" className="form-control" value={state.widgetCameraResolution} onChange={handleInputChange} disabled={state.isWidgetCaptureStarted}>
                        {Object.entries(FPhiCameraResolutions)
                          .map(mode => ({ key: mode[0], value: mode[1] }))
                          .map(mode => <option value={mode.key} key={mode.key}>{mode.value.title}</option>)}
                      </select>
                    </div>
                    <button type="button" id="btnStartCapture" className="btn btn-primary btn-block" onClick={onStartCapture} disabled={state.isWidgetCaptureStarted}>Start capture</button>
                    <button type="button" id="btnStopCapture" className="btn btn-danger btn-block" onClick={onStopCapture} disabled={!state.isWidgetCaptureStarted}>Stop capture</button>
                </div>
                </div>
            </div>
    
        </React.Fragment>


    )

    function handleInputChange(event) {
        if (event.target.id === "widgetCameraResolution") {
          setState({
            widgetCameraWidth: FPhiCameraResolutions[event.target.value].width,
            widgetCameraHeight: FPhiCameraResolutions[event.target.value].height
          });
        }
    
        setState({
          [event.target.id]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        });
    
        console.warn(">>>> [app] handleInputChange", state);
      }
    
      function onStartCapture() { console.warn(">>>> [app] onStartCapture", state); setState({ isWidgetCaptureStarted: true }); }
      function onStopCapture() { console.warn(">>>> [app] onStopCapture", state); setState({ isWidgetCaptureStarted: false }); }
    
      // Widget event handlers
      function onModuleLoaded(eventData) {
        console.warn("[Selphi] onModuleLoaded");
        console.log(eventData);
      }
    
      function onStabilizing(stabilizingResult) {
        console.warn("[Selphi] onStabilizing");
        console.log(stabilizingResult);
      }
    
      function onExtractionFinish(extractionResult) {
        console.warn("[Selphi] onExtractionFinish");
        console.log(extractionResult);
    
        console.log("Images returned: ", extractionResult.detail.images);
        for (let i = 0; i < extractionResult.detail.images.length; i++) {
          const img = extractionResult.detail.images[i];
          console.log(`Image ${i}: ${img.src}`);
        }
    
        if (extractionResult.detail.bestImage)
          console.log("BestImage: ", extractionResult.detail.bestImage.src);
        if (extractionResult.detail.bestImageCropped)
          console.log("BestImageCropped: ", extractionResult.detail.bestImageCropped.src);
    
        console.log("Template: ", extractionResult.detail.template);
        console.log("TemplateRaw: ", extractionResult.detail.templateRaw);
        console.log("TimeStamp: ", extractionResult.detail.timeStamp);
    
        console.log("LivenessMoveFails: ", extractionResult.detail.livenessMoveFails);
        console.log("SunGlassesScore: ", extractionResult.detail.sunGlassesScore);
    
        console.log("LivenessMoveHistory: ", extractionResult.detail.livenessMoveHistory);
        console.log("LivenessMoveStabilizedStatusHistory: ", extractionResult.detail.livenessMoveStabilizedStatusHistory);
        console.log("LivenessMoveLastStabilizedStatus: ", extractionResult.detail.livenessMoveLastStabilizedStatus);
    
        setState({ isWidgetCaptureStarted: false });
      }
    
      function onUserCancel() {
        console.warn("[Selphi] onUserCancel");
        setState({ isWidgetCaptureStarted: false });
      }
    
      function onExceptionCaptured(exceptionResult) {
        console.warn("[Selphi] onExceptionCaptured");
        console.log(`exceptionType: ${exceptionResult.detail.exceptionType}`);
        console.log(`exceptionMessage: ${exceptionResult.detail.message}`);
        console.log(exceptionResult);
    
        setState({ isWidgetCaptureStarted: false });
      }
    
      function onLivenessError(livenessErrorResult) {
        console.warn("[Selphi] onLivenessError");
        console.log(livenessErrorResult);
    
        switch (livenessErrorResult.detail.livenessErrorType) {
          case FPhiSelphiConstants.LivenessDiagnostic.Unsuccess:
            console.log("[Selphi] Liveness error: Blink or movement not detected");
            break;
          case FPhiSelphiConstants.LivenessDiagnostic.UnsuccessLowPerformance:
            console.log("[Selphi] Liveness error: Low performance");
            break;
          case FPhiSelphiConstants.LivenessDiagnostic.UnsuccessGlasses:
            console.log("[Selphi] Liveness error: Glasses detected");
            break;
          case FPhiSelphiConstants.LivenessDiagnostic.UnsuccessLight:
            console.log("[Selphi] Liveness error: Bad lighting conditions");
            break;
          case FPhiSelphiConstants.LivenessDiagnostic.UnsuccessNoMovement:
            console.log("[Selphi] Liveness error: No movement");
            break;
          case FPhiSelphiConstants.LivenessDiagnostic.UnsuccessWrongDirection:
            console.log("[Selphi] Liveness error: Wrong direction");
            break;
          case FPhiSelphiConstants.LivenessDiagnostic.UnsuccessTooFar:
            console.log("[Selphi] Liveness error: Face too far");
            break;
          default:
            console.log("[Selphi] Liveness error");
            break;
        }
      }
    
      function onLivenessErrorButtonClick() {
        console.warn("[Selphi] onLivenessErrorButtonClick");
        setState({ isWidgetCaptureStarted: false });
      }
    
      function onExtractionTimeout(extractionTimeoutResult) {
        console.warn("[Selphi] onExtractionTimeout");
        console.log(extractionTimeoutResult);
      }
    
      function onTimeoutErrorButtonClick() {
        console.warn("[Selphi] onTimeoutErrorButtonClick");
        setState({ isWidgetCaptureStarted: false });
      }
};

export default Facephi;
