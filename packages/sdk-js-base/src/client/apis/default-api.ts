/* tslint:disable */
/* eslint-disable */
/**
 * Dittofeed API
 * Interactive API documentation.
 *
 * OpenAPI spec version: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { AppsBatchBody } from '../models';
/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPublicAppsAliasPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/public/apps/alias`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * The batch method lets you send a series of identify, group, track, page and screen requests in a single batch, saving on outbound requests.
         * @param {AppsBatchBody} body 
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPublicAppsBatchPost: async (body: AppsBatchBody, dfWorkspaceId: any, authorization: any, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling apiPublicAppsBatchPost.');
            }
            // verify required parameter 'dfWorkspaceId' is not null or undefined
            if (dfWorkspaceId === null || dfWorkspaceId === undefined) {
                throw new RequiredError('dfWorkspaceId','Required parameter dfWorkspaceId was null or undefined when calling apiPublicAppsBatchPost.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling apiPublicAppsBatchPost.');
            }
            const localVarPath = `/api/public/apps/batch`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (dfWorkspaceId !== undefined && dfWorkspaceId !== null) {
                localVarHeaderParameter['df-workspace-id'] = String(JSON.stringify(dfWorkspaceId));
            }

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['authorization'] = String(JSON.stringify(authorization));
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPublicAppsGroupPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/public/apps/group`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * The Identify call lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about the user, like their email, name, and more.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPublicAppsIdentifyPost: async (dfWorkspaceId: any, authorization: any, body?: any, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'dfWorkspaceId' is not null or undefined
            if (dfWorkspaceId === null || dfWorkspaceId === undefined) {
                throw new RequiredError('dfWorkspaceId','Required parameter dfWorkspaceId was null or undefined when calling apiPublicAppsIdentifyPost.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling apiPublicAppsIdentifyPost.');
            }
            const localVarPath = `/api/public/apps/identify`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (dfWorkspaceId !== undefined && dfWorkspaceId !== null) {
                localVarHeaderParameter['df-workspace-id'] = String(JSON.stringify(dfWorkspaceId));
            }

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['authorization'] = String(JSON.stringify(authorization));
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * The page call lets you record whenever a user sees a page of your website, along with any optional properties about the page.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPublicAppsPagePost: async (dfWorkspaceId: any, authorization: any, body?: any, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'dfWorkspaceId' is not null or undefined
            if (dfWorkspaceId === null || dfWorkspaceId === undefined) {
                throw new RequiredError('dfWorkspaceId','Required parameter dfWorkspaceId was null or undefined when calling apiPublicAppsPagePost.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling apiPublicAppsPagePost.');
            }
            const localVarPath = `/api/public/apps/page`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (dfWorkspaceId !== undefined && dfWorkspaceId !== null) {
                localVarHeaderParameter['df-workspace-id'] = String(JSON.stringify(dfWorkspaceId));
            }

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['authorization'] = String(JSON.stringify(authorization));
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * The screen call lets you record whenever a user sees a screen, the mobile equivalent of page, in your mobile app, along with any properties about the screen
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPublicAppsScreenPost: async (dfWorkspaceId: any, authorization: any, body?: any, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'dfWorkspaceId' is not null or undefined
            if (dfWorkspaceId === null || dfWorkspaceId === undefined) {
                throw new RequiredError('dfWorkspaceId','Required parameter dfWorkspaceId was null or undefined when calling apiPublicAppsScreenPost.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling apiPublicAppsScreenPost.');
            }
            const localVarPath = `/api/public/apps/screen`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (dfWorkspaceId !== undefined && dfWorkspaceId !== null) {
                localVarHeaderParameter['df-workspace-id'] = String(JSON.stringify(dfWorkspaceId));
            }

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['authorization'] = String(JSON.stringify(authorization));
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * The Track call is how you record any actions your users perform, along with any properties that describe the action.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPublicAppsTrackPost: async (dfWorkspaceId: any, authorization: any, body?: any, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'dfWorkspaceId' is not null or undefined
            if (dfWorkspaceId === null || dfWorkspaceId === undefined) {
                throw new RequiredError('dfWorkspaceId','Required parameter dfWorkspaceId was null or undefined when calling apiPublicAppsTrackPost.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling apiPublicAppsTrackPost.');
            }
            const localVarPath = `/api/public/apps/track`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (dfWorkspaceId !== undefined && dfWorkspaceId !== null) {
                localVarHeaderParameter['df-workspace-id'] = String(JSON.stringify(dfWorkspaceId));
            }

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['authorization'] = String(JSON.stringify(authorization));
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsAliasPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).apiPublicAppsAliasPost(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * The batch method lets you send a series of identify, group, track, page and screen requests in a single batch, saving on outbound requests.
         * @param {AppsBatchBody} body 
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsBatchPost(body: AppsBatchBody, dfWorkspaceId: any, authorization: any, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).apiPublicAppsBatchPost(body, dfWorkspaceId, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsGroupPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).apiPublicAppsGroupPost(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * The Identify call lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about the user, like their email, name, and more.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsIdentifyPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).apiPublicAppsIdentifyPost(dfWorkspaceId, authorization, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * The page call lets you record whenever a user sees a page of your website, along with any optional properties about the page.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsPagePost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).apiPublicAppsPagePost(dfWorkspaceId, authorization, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * The screen call lets you record whenever a user sees a screen, the mobile equivalent of page, in your mobile app, along with any properties about the screen
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsScreenPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).apiPublicAppsScreenPost(dfWorkspaceId, authorization, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * The Track call is how you record any actions your users perform, along with any properties that describe the action.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsTrackPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<any>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).apiPublicAppsTrackPost(dfWorkspaceId, authorization, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsAliasPost(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return DefaultApiFp(configuration).apiPublicAppsAliasPost(options).then((request) => request(axios, basePath));
        },
        /**
         * The batch method lets you send a series of identify, group, track, page and screen requests in a single batch, saving on outbound requests.
         * @param {AppsBatchBody} body 
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsBatchPost(body: AppsBatchBody, dfWorkspaceId: any, authorization: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return DefaultApiFp(configuration).apiPublicAppsBatchPost(body, dfWorkspaceId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsGroupPost(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return DefaultApiFp(configuration).apiPublicAppsGroupPost(options).then((request) => request(axios, basePath));
        },
        /**
         * The Identify call lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about the user, like their email, name, and more.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsIdentifyPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return DefaultApiFp(configuration).apiPublicAppsIdentifyPost(dfWorkspaceId, authorization, body, options).then((request) => request(axios, basePath));
        },
        /**
         * The page call lets you record whenever a user sees a page of your website, along with any optional properties about the page.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsPagePost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return DefaultApiFp(configuration).apiPublicAppsPagePost(dfWorkspaceId, authorization, body, options).then((request) => request(axios, basePath));
        },
        /**
         * The screen call lets you record whenever a user sees a screen, the mobile equivalent of page, in your mobile app, along with any properties about the screen
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsScreenPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return DefaultApiFp(configuration).apiPublicAppsScreenPost(dfWorkspaceId, authorization, body, options).then((request) => request(axios, basePath));
        },
        /**
         * The Track call is how you record any actions your users perform, along with any properties that describe the action.
         * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
         * @param {any} authorization 
         * @param {any} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPublicAppsTrackPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
            return DefaultApiFp(configuration).apiPublicAppsTrackPost(dfWorkspaceId, authorization, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async apiPublicAppsAliasPost(options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return DefaultApiFp(this.configuration).apiPublicAppsAliasPost(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * The batch method lets you send a series of identify, group, track, page and screen requests in a single batch, saving on outbound requests.
     * @param {AppsBatchBody} body 
     * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
     * @param {any} authorization 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async apiPublicAppsBatchPost(body: AppsBatchBody, dfWorkspaceId: any, authorization: any, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return DefaultApiFp(this.configuration).apiPublicAppsBatchPost(body, dfWorkspaceId, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async apiPublicAppsGroupPost(options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return DefaultApiFp(this.configuration).apiPublicAppsGroupPost(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * The Identify call lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about the user, like their email, name, and more.
     * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
     * @param {any} authorization 
     * @param {any} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async apiPublicAppsIdentifyPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return DefaultApiFp(this.configuration).apiPublicAppsIdentifyPost(dfWorkspaceId, authorization, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * The page call lets you record whenever a user sees a page of your website, along with any optional properties about the page.
     * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
     * @param {any} authorization 
     * @param {any} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async apiPublicAppsPagePost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return DefaultApiFp(this.configuration).apiPublicAppsPagePost(dfWorkspaceId, authorization, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * The screen call lets you record whenever a user sees a screen, the mobile equivalent of page, in your mobile app, along with any properties about the screen
     * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
     * @param {any} authorization 
     * @param {any} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async apiPublicAppsScreenPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return DefaultApiFp(this.configuration).apiPublicAppsScreenPost(dfWorkspaceId, authorization, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * The Track call is how you record any actions your users perform, along with any properties that describe the action.
     * @param {any} dfWorkspaceId Id of the workspace which will receive the segment payload. Defaults to the default workspace id, for single tenant systems
     * @param {any} authorization 
     * @param {any} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async apiPublicAppsTrackPost(dfWorkspaceId: any, authorization: any, body?: any, options?: AxiosRequestConfig) : Promise<AxiosResponse<any>> {
        return DefaultApiFp(this.configuration).apiPublicAppsTrackPost(dfWorkspaceId, authorization, body, options).then((request) => request(this.axios, this.basePath));
    }
}
