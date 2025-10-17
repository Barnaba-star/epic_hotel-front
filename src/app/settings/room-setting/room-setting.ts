import { Component } from '@angular/core';
import HeaderComponent from "../../Utils/component/header/header.component";
import { MenuItem, SidenavComponent } from '../../Utils/component/sidenav/sidenav.component';
import { TitleComponent } from "../../Utils/component/title/title.component";
import { TabsComponent } from "../../Utils/component/tabs/tabs.component";
import { FabButtonComponent } from "../../Utils/component/fab-button/fab-button";

@Component({
  selector: 'app-room-setting',
  imports: [HeaderComponent, SidenavComponent, TitleComponent],
  templateUrl: './room-setting.html',
  styleUrl: './room-setting.css'
})
export class RoomSetting {
titleHeader = 'Settings';
menu: MenuItem[] = [
  {
    label: 'System Setting',
    icon: 'setting',
     route: '/settings' ,
    
  },
  {
    label: 'User Setting',
    icon: 'seting',
    route: '/usersetting'
  },
 {
    label: 'Room Setting',
    icon: 'roomseting',
  
  },
];
onMenuItemClicked(item: MenuItem) {
  console.log('Menu Item Clicked:', item);
}

 tabs = [{
      label: 'Rooms',
      icon: 'room',
    },
   
  ];
  selectedTabIndex = 0;
  selectedIndexChange(index: number) {
  this.selectedTabIndex = index;

}
}
