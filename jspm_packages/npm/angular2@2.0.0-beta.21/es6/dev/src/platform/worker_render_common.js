/* */ 
"format esm";
import { CONST_EXPR, IS_DART } from 'angular2/src/facade/lang';
import { MessageBus } from 'angular2/src/web_workers/shared/message_bus';
import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { ExceptionHandler, APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS, RootRenderer, PLATFORM_INITIALIZER } from 'angular2/core';
import { EVENT_MANAGER_PLUGINS, EventManager } from 'angular2/platform/common_dom';
import { Provider, OpaqueToken } from 'angular2/src/core/di';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { DomEventsPlugin } from 'angular2/src/platform/dom/events/dom_events';
import { KeyEventsPlugin } from 'angular2/src/platform/dom/events/key_events';
import { DOCUMENT } from 'angular2/src/platform/dom/dom_tokens';
import { DomRootRenderer, DomRootRenderer_ } from 'angular2/src/platform/dom/dom_renderer';
import { DomSharedStylesHost, SharedStylesHost } from 'angular2/src/platform/dom/shared_styles_host';
import { BrowserDetails } from 'angular2/src/animate/browser_details';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { XHR } from 'angular2/compiler';
import { XHRImpl } from 'angular2/src/platform/browser/xhr_impl';
import { Testability } from 'angular2/src/core/testability/testability';
import { BrowserGetTestability } from 'angular2/src/platform/browser/testability';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { wtfInit } from 'angular2/src/core/profile/wtf_init';
import { MessageBasedRenderer } from 'angular2/src/web_workers/ui/renderer';
import { MessageBasedXHRImpl } from 'angular2/src/web_workers/ui/xhr_impl';
import { ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/service_message_broker';
import { ClientMessageBrokerFactory, ClientMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/client_message_broker';
import { BrowserPlatformLocation } from 'angular2/src/platform/browser/location/browser_platform_location';
import { Serializer } from 'angular2/src/web_workers/shared/serializer';
import { ON_WEB_WORKER } from 'angular2/src/web_workers/shared/api';
import { RenderStore } from 'angular2/src/web_workers/shared/render_store';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerGesturesPlugin } from 'angular2/src/platform/dom/events/hammer_gestures';
export const WORKER_SCRIPT = CONST_EXPR(new OpaqueToken("WebWorkerScript"));
// Message based Worker classes that listen on the MessageBus
export const WORKER_RENDER_MESSAGING_PROVIDERS = CONST_EXPR([MessageBasedRenderer, MessageBasedXHRImpl]);
export const WORKER_RENDER_PLATFORM_MARKER = CONST_EXPR(new OpaqueToken('WorkerRenderPlatformMarker'));
export const WORKER_RENDER_PLATFORM = CONST_EXPR([
    PLATFORM_COMMON_PROVIDERS,
    CONST_EXPR(new Provider(WORKER_RENDER_PLATFORM_MARKER, { useValue: true })),
    new Provider(PLATFORM_INITIALIZER, { useValue: initWebWorkerRenderPlatform, multi: true })
]);
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 */
export const WORKER_RENDER_ROUTER = CONST_EXPR([BrowserPlatformLocation]);
export const WORKER_RENDER_APPLICATION_COMMON = CONST_EXPR([
    APPLICATION_COMMON_PROVIDERS,
    WORKER_RENDER_MESSAGING_PROVIDERS,
    new Provider(ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    new Provider(DOCUMENT, { useFactory: _document, deps: [] }),
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: DomEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: KeyEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: HammerGesturesPlugin, multi: true }),
    new Provider(HAMMER_GESTURE_CONFIG, { useClass: HammerGestureConfig }),
    new Provider(DomRootRenderer, { useClass: DomRootRenderer_ }),
    new Provider(RootRenderer, { useExisting: DomRootRenderer }),
    new Provider(SharedStylesHost, { useExisting: DomSharedStylesHost }),
    new Provider(XHR, { useClass: XHRImpl }),
    MessageBasedXHRImpl,
    new Provider(ServiceMessageBrokerFactory, { useClass: ServiceMessageBrokerFactory_ }),
    new Provider(ClientMessageBrokerFactory, { useClass: ClientMessageBrokerFactory_ }),
    Serializer,
    new Provider(ON_WEB_WORKER, { useValue: false }),
    RenderStore,
    DomSharedStylesHost,
    Testability,
    BrowserDetails,
    AnimationBuilder,
    EventManager
]);
export function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(MessageBus);
    let zone = injector.get(NgZone);
    bus.attachToZone(zone);
    zone.runGuarded(() => {
        WORKER_RENDER_MESSAGING_PROVIDERS.forEach((token) => { injector.get(token).start(); });
    });
}
export function initWebWorkerRenderPlatform() {
    BrowserDomAdapter.makeCurrent();
    wtfInit();
    BrowserGetTestability.init();
}
function _exceptionHandler() {
    return new ExceptionHandler(DOM, !IS_DART);
}
function _document() {
    return DOM.defaultDoc();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlcl9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXhCTElCclZSLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcl9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0sMEJBQTBCO09BQ3JELEVBQUMsVUFBVSxFQUFDLE1BQU0sNkNBQTZDO09BQy9ELEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0NBQWdDO09BQzlDLEVBSUwsZ0JBQWdCLEVBR2hCLDRCQUE0QixFQUM1Qix5QkFBeUIsRUFDekIsWUFBWSxFQUNaLG9CQUFvQixFQUVyQixNQUFNLGVBQWU7T0FDZixFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLDhCQUE4QjtPQUN6RSxFQUFVLFFBQVEsRUFBWSxXQUFXLEVBQUMsTUFBTSxzQkFBc0I7T0FFdEUsRUFBQyxHQUFHLEVBQUMsTUFBTSx1Q0FBdUM7T0FDbEQsRUFBQyxlQUFlLEVBQUMsTUFBTSw2Q0FBNkM7T0FDcEUsRUFBQyxlQUFlLEVBQUMsTUFBTSw2Q0FBNkM7T0FDcEUsRUFBQyxRQUFRLEVBQUMsTUFBTSxzQ0FBc0M7T0FDdEQsRUFBQyxlQUFlLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSx3Q0FBd0M7T0FDakYsRUFBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLDhDQUE4QztPQUMzRixFQUFDLGNBQWMsRUFBQyxNQUFNLHNDQUFzQztPQUM1RCxFQUFDLGdCQUFnQixFQUFDLE1BQU0sd0NBQXdDO09BQ2hFLEVBQUMsR0FBRyxFQUFDLE1BQU0sbUJBQW1CO09BQzlCLEVBQUMsT0FBTyxFQUFDLE1BQU0sd0NBQXdDO09BQ3ZELEVBQUMsV0FBVyxFQUFDLE1BQU0sMkNBQTJDO09BQzlELEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQ0FBMkM7T0FD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TlNUX0VYUFIsIElTX0RBUlR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZSc7XG5pbXBvcnQge1xuICBQTEFURk9STV9ESVJFQ1RJVkVTLFxuICBQTEFURk9STV9QSVBFUyxcbiAgQ29tcG9uZW50UmVmLFxuICBFeGNlcHRpb25IYW5kbGVyLFxuICBSZWZsZWN0b3IsXG4gIHJlZmxlY3RvcixcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgUm9vdFJlbmRlcmVyLFxuICBQTEFURk9STV9JTklUSUFMSVpFUixcbiAgQVBQX0lOSVRJQUxJWkVSXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyLCBJbmplY3RvciwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbi8vIFRPRE8gY2hhbmdlIHRoZXNlIGltcG9ydHMgb25jZSBkb21fYWRhcHRlciBpcyBtb3ZlZCBvdXQgb2YgY29yZVxuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtEb21FdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtLZXlFdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2tleV9ldmVudHMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyLCBEb21Sb290UmVuZGVyZXJffSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3QsIFNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2Jyb3dzZXJfZGV0YWlscyc7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5pbXBvcnQge1hIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsJztcbmltcG9ydCB7VGVzdGFiaWxpdHl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7QnJvd3NlckdldFRlc3RhYmlsaXR5fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7d3RmSW5pdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcHJvZmlsZS93dGZfaW5pdCc7XG5pbXBvcnQge01lc3NhZ2VCYXNlZFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXInO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRYSFJJbXBsfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkveGhyX2ltcGwnO1xuaW1wb3J0IHtcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlfXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1xuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnlfXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7XG4gIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1xuICBIQU1NRVJfR0VTVFVSRV9DT05GSUcsXG4gIEhhbW1lckdlc3R1cmVDb25maWcsXG4gIEhhbW1lckdlc3R1cmVzUGx1Z2luXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcyc7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfU0NSSVBUOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiV2ViV29ya2VyU2NyaXB0XCIpKTtcblxuLy8gTWVzc2FnZSBiYXNlZCBXb3JrZXIgY2xhc3NlcyB0aGF0IGxpc3RlbiBvbiB0aGUgTWVzc2FnZUJ1c1xuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfTUVTU0FHSU5HX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW01lc3NhZ2VCYXNlZFJlbmRlcmVyLCBNZXNzYWdlQmFzZWRYSFJJbXBsXSk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX1BMQVRGT1JNX01BUktFUiA9XG4gICAgQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ1dvcmtlclJlbmRlclBsYXRmb3JtTWFya2VyJykpO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9QTEFURk9STTogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoV09SS0VSX1JFTkRFUl9QTEFURk9STV9NQVJLRVIsIHt1c2VWYWx1ZTogdHJ1ZX0pKSxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSwgbXVsdGk6IHRydWV9KVxuXSk7XG5cbi8qKlxuICogQSBsaXN0IG9mIHtAbGluayBQcm92aWRlcn1zLiBUbyB1c2UgdGhlIHJvdXRlciBpbiBhIFdvcmtlciBlbmFibGVkIGFwcGxpY2F0aW9uIHlvdSBtdXN0XG4gKiBpbmNsdWRlIHRoZXNlIHByb3ZpZGVycyB3aGVuIHNldHRpbmcgdXAgdGhlIHJlbmRlciB0aHJlYWQuXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX1JPVVRFUjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW0Jyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uXSk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OX0NPTU1PTjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgV09SS0VSX1JFTkRFUl9NRVNTQUdJTkdfUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoRXhjZXB0aW9uSGFuZGxlciwge3VzZUZhY3Rvcnk6IF9leGNlcHRpb25IYW5kbGVyLCBkZXBzOiBbXX0pLFxuICBuZXcgUHJvdmlkZXIoRE9DVU1FTlQsIHt1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSksXG4gIC8vIFRPRE8oanRlcGxpdHo2MDIpOiBJbnZlc3RpZ2F0ZSBpZiB3ZSBkZWZpbml0ZWx5IG5lZWQgRVZFTlRfTUFOQUdFUiBvbiB0aGUgcmVuZGVyIHRocmVhZFxuICAvLyAjNTI5OFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogSGFtbWVyR2VzdHVyZXNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHt1c2VDbGFzczogSGFtbWVyR2VzdHVyZUNvbmZpZ30pLFxuICBuZXcgUHJvdmlkZXIoRG9tUm9vdFJlbmRlcmVyLCB7dXNlQ2xhc3M6IERvbVJvb3RSZW5kZXJlcl99KSxcbiAgbmV3IFByb3ZpZGVyKFJvb3RSZW5kZXJlciwge3VzZUV4aXN0aW5nOiBEb21Sb290UmVuZGVyZXJ9KSxcbiAgbmV3IFByb3ZpZGVyKFNoYXJlZFN0eWxlc0hvc3QsIHt1c2VFeGlzdGluZzogRG9tU2hhcmVkU3R5bGVzSG9zdH0pLFxuICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUkltcGx9KSxcbiAgTWVzc2FnZUJhc2VkWEhSSW1wbCxcbiAgbmV3IFByb3ZpZGVyKFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlffSksXG4gIG5ldyBQcm92aWRlcihDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV99KSxcbiAgU2VyaWFsaXplcixcbiAgbmV3IFByb3ZpZGVyKE9OX1dFQl9XT1JLRVIsIHt1c2VWYWx1ZTogZmFsc2V9KSxcbiAgUmVuZGVyU3RvcmUsXG4gIERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gIFRlc3RhYmlsaXR5LFxuICBCcm93c2VyRGV0YWlscyxcbiAgQW5pbWF0aW9uQnVpbGRlcixcbiAgRXZlbnRNYW5hZ2VyXG5dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIHZhciBidXMgPSBpbmplY3Rvci5nZXQoTWVzc2FnZUJ1cyk7XG4gIGxldCB6b25lID0gaW5qZWN0b3IuZ2V0KE5nWm9uZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG5cbiAgem9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICBXT1JLRVJfUkVOREVSX01FU1NBR0lOR19QUk9WSURFUlMuZm9yRWFjaCgodG9rZW4pID0+IHsgaW5qZWN0b3IuZ2V0KHRva2VuKS5zdGFydCgpOyB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0oKTogdm9pZCB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIHd0ZkluaXQoKTtcbiAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbn1cblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXhjZXB0aW9uSGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXhjZXB0aW9uSGFuZGxlcihET00sICFJU19EQVJUKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIHJldHVybiBET00uZGVmYXVsdERvYygpO1xufVxuIl19