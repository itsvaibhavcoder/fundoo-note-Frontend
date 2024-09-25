import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SEARCH_ICON, MENU_ICON,  SETTING_ICON, REFRESH_ICON,LIST_VIEW_ICON } from 'src/assets/svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('main-menu', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
    iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('refresh-icon', sanitizer.bypassSecurityTrustHtml(REFRESH_ICON));
    iconRegistry.addSvgIconLiteral('setting-icon', sanitizer.bypassSecurityTrustHtml(SETTING_ICON));
    iconRegistry.addSvgIconLiteral('list-view-icon', sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    
   }

  ngOnInit(): void {
  }

}
