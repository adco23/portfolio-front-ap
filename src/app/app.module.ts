import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData  } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { EducationComponent } from './pages/education/education.component';
import { SkillsComponent } from './pages/skills/skills.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { CardComponent } from './components/card/card.component';
import { AlertComponent } from './components/alert/alert.component';
import { OptionsDotsComponent } from './components/options-dots/options-dots.component';
import { EducationCardComponent } from './components/education-card/education-card.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { ScardComponent } from './components/skeleton/scard/scard.component';

import { EditAboutComponent } from './modals/edit-about/edit-about.component';
import { ModalComponent } from './modals/modal/modal.component';
import { EducationModalComponent } from './modals/education-modal/education-modal.component';
import { ScrollSectionDirective } from './directives/scroll-section.directive';
import { ScrollAnchorDirective } from './directives/scroll-anchor.directive';
import { ScrollManagerDirective } from './directives/scroll-manager.directive';
import { SkillChipsComponent } from './components/skill-chips/skill-chips.component';
import { SkillFilterPipe } from './pipes/skill-filter.pipe';
import { XMarksComponent } from './components/icons/x-marks/x-marks.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { LoginComponent } from './pages/login/login.component';
import { PagesContainerComponent } from './components/pages-container/pages-container.component';
import { interceptorProvider } from './services/interceptor.service';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BannerComponent,
    AboutComponent,
    ExperienceComponent,
    CardComponent,
    AlertComponent,
    EditAboutComponent,
    OptionsDotsComponent,
    ModalComponent,
    ScrollSectionDirective,
    ScrollAnchorDirective,
    ScrollManagerDirective,
    EducationComponent,
    EducationCardComponent,
    EducationModalComponent,
    DateSelectorComponent,
    ScardComponent,
    SkillsComponent,
    SkillChipsComponent,
    SkillFilterPipe,
    XMarksComponent,
    ProjectsComponent,
    ProjectCardComponent,
    LoginComponent,
    PagesContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
