import { Component, EventEmitter, Renderer2, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SEARCH_ICON, MENU_ICON,  SETTING_ICON, REFRESH_ICON,LIST_VIEW_ICON } from 'src/assets/svg-icons';
import { DataService } from 'src/services/data-service/data.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleDrawer = new EventEmitter<void>();
  searchQuery:string = ""
  showProfile: boolean = false;
  isDarkTheme: boolean = false;
  userName: string = localStorage.getItem('name') || ''
  userEmail: string = localStorage.getItem('email') || '';
  
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataService, private router: Router, private renderer: Renderer2) {
    iconRegistry.addSvgIconLiteral('main-menu', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
    iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('refresh-icon', sanitizer.bypassSecurityTrustHtml(REFRESH_ICON));
    iconRegistry.addSvgIconLiteral('setting-icon', sanitizer.bypassSecurityTrustHtml(SETTING_ICON));
    iconRegistry.addSvgIconLiteral('list-view-icon', sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
   }

  ngOnInit(): void {
    // const savedTheme = localStorage.getItem('theme');
    // if(savedTheme){
    //   this.isDarkTheme = savedTheme==='dark';
    //   this.loadTheme();
    // }
  }
  // changeTheme(){
  //  this.isDarkTheme = !this.isDarkTheme;
  //  localStorage.setItem('theme', this.isDarkTheme ? 'dark': 'light');
  //  this.loadTheme();
  // }

  // loadTheme(){
  //   const themeLink = document.getElementById('app-theme') as HTMLLinkElement;

  //   if (this.isDarkTheme) {
  //     themeLink.href = this.isDarkTheme ? 'assets/theme/dark-theme.scss':'assets/theme/light-theme.scss';
  //   } 
  // }
  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
  handleSearchQuery(){
    this.dataService.updateSearchQuery(this.searchQuery)
  }
  refreshPage() {
    window.location.reload(); 
  }
  onMenuIconClick(){
    this.toggleDrawer.emit();
  }
}
