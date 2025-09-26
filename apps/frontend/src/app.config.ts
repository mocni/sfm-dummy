import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideClientHydration } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// icons
import { TablerIconsModule } from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";

// perfect scrollbar
import { NgScrollbarModule } from "ngx-scrollbar";
import { NgxPermissionsModule } from "ngx-permissions";
//Import all material modules
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

// API Configuration
import { configFactory } from "app/shared/providers/api-config.provider";

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

import { NgxEchartsModule } from "ngx-echarts";
import { routes } from "./app.routes";
import { CustomHttpInterceptor } from "app/shared/interceptors/http-interceptor.interceptor";
import { provideStore, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { Configuration } from "../libs/api-client-smart-fleet-management";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({}),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      }),
      withComponentInputBinding(),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      NgxPermissionsModule.forRoot(),
      TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      NgxEchartsModule.forRoot({
        echarts: () => import("echarts"),
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: Configuration,
      useFactory: () => configFactory(),
      deps: [],
      multi: false,
    },
  ],
};
