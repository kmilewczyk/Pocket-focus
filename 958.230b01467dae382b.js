"use strict";(self.webpackChunkpocket_focus=self.webpackChunkpocket_focus||[]).push([[958],{958:(b,c,m)=>{m.r(c),m.d(c,{PomodoroModule:()=>f});var d=m(808),l=m(895),o=m(223);let a=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-timer"]],decls:12,vars:0,consts:[[1,"text-center"],[1,"d-flex","align-items-center"],[1,"btn"],[1,"bi","bi-dash-circle","display-5"],[1,"display-1","mx-sm-2"],[2,"font-size","calc(4rem + 5vw)"],[1,"bi","bi-plus-circle","display-5"],[1,"text-muted",2,"font-size","calc(1rem + 1vw)"]],template:function(e,i){1&e&&(o.TgZ(0,"div"),o.TgZ(1,"div",0),o.TgZ(2,"div",1),o.TgZ(3,"button",2),o._UZ(4,"i",3),o.qZA(),o.TgZ(5,"h1",4),o.TgZ(6,"span",5),o._uU(7,"25:00"),o.qZA(),o.qZA(),o.TgZ(8,"button",2),o._UZ(9,"i",6),o.qZA(),o.qZA(),o.TgZ(10,"p",7),o._uU(11," 05:00 break "),o.qZA(),o.qZA(),o.qZA())},styles:[""]}),t})();function p(t,n){1&t&&(o.TgZ(0,"h5"),o._uU(1,"pomodoro"),o.qZA())}function u(t,n){1&t&&(o.TgZ(0,"h5"),o._uU(1,"hour"),o.qZA())}function s(t,n){1&t&&(o.TgZ(0,"h5"),o._uU(1,"indefinite"),o.qZA())}var r=(()=>{return(t=r||(r={}))[t.Pomodoro=0]="Pomodoro",t[t.Hour=1]="Hour",t[t.Indefinite=2]="Indefinite",r;var t})();const Z=[{path:"",component:(()=>{class t{constructor(){this.TimerType=r,this.timerType=r.Pomodoro}ngOnInit(){}onTimerTypeSwitch(){const e=[r.Pomodoro,r.Hour,r.Indefinite];this.timerType=e[(e.indexOf(this.timerType)+1)%e.length]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-pomodoro"]],decls:36,vars:5,consts:[[1,"container-md"],[1,"row"],[1,"col-lg-10","mx-auto","navbar","navbar-dark","mb-3","p-2","bg-dark","dark"],[1,"container-fluid"],[1,"navbar-brand"],["role","button",1,"text-light"],["aria-label","Settings",1,"bi","bi-gear","display-5","p-2"],[1,"row","mb-2"],[1,"col-md-7","mx-auto","p-3"],["type","text","placeholder","Insert task title here",1,"task-title","display-6","w-100","rounded-3"],[1,"row","mb-5"],[1,"d-flex","justify-content-center","col-sm-10","col-lg-7","col-xl-6","mx-auto"],[1,"flex-grow-1","pomodoro-timer","rounded-sm-circle","bg-dark","pb-4","pt-sm-5"],[1,"d-flex","flex-column","align-items-center","justify-content-center","h-100","p-2"],[1,"align-self-end","mt-sm-n6","mb-xs-4"],[1,"bi","bi-x-circle","display-3"],[1,"text-center"],[1,"btn","btn-outline-primary",2,"min-width","8rem",3,"click"],[4,"ngIf"],[1,"d-flex","justify-content-center","mx-auto"],[1,"btn","btn-primary","stop-button"],[1,"btn","btn-lg","btn-primary","mx-1"],[1,"bi","bi-play-fill","display-5"]],template:function(e,i){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"nav",2),o.TgZ(3,"div",3),o.TgZ(4,"h1",4),o._uU(5,"Pomodoro app"),o.qZA(),o.TgZ(6,"a",5),o._UZ(7,"i",6),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(8,"div",7),o.TgZ(9,"div",8),o._UZ(10,"input",9),o.qZA(),o.qZA(),o.TgZ(11,"div",10),o.TgZ(12,"div",11),o.TgZ(13,"div",12),o.TgZ(14,"div",13),o.TgZ(15,"div",14),o._UZ(16,"i",15),o.qZA(),o.TgZ(17,"div",16),o.TgZ(18,"h3"),o._uU(19,"Total time"),o.qZA(),o.TgZ(20,"p"),o._uU(21,"1 hour"),o.qZA(),o.qZA(),o._UZ(22,"app-timer"),o._UZ(23,"br"),o.TgZ(24,"button",17),o.NdJ("click",function(){return i.onTimerTypeSwitch()}),o.YNc(25,p,2,0,"h5",18),o.YNc(26,u,2,0,"h5",18),o.YNc(27,s,2,0,"h5",18),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(28,"div",1),o.TgZ(29,"div",19),o.TgZ(30,"button",20),o._uU(31," break "),o.qZA(),o.TgZ(32,"button",21),o._UZ(33,"i",22),o.qZA(),o.TgZ(34,"button",20),o._uU(35," interrupt "),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.xp6(17),o.Udp("visibility",i.timerType===i.TimerType.Indefinite?"hidden":"visible"),o.xp6(8),o.Q6J("ngIf",i.timerType===i.TimerType.Pomodoro),o.xp6(1),o.Q6J("ngIf",i.timerType===i.TimerType.Hour),o.xp6(1),o.Q6J("ngIf",i.timerType===i.TimerType.Indefinite))},directives:[a,d.O5],styles:["@media screen and (min-width: 576px){.pomodoro-timer[_ngcontent-%COMP%]{aspect-ratio:1/1}}.task-title[_ngcontent-%COMP%]{background:transparent;color:#eee;text-align:center;border:0!important}.stop-button[_ngcontent-%COMP%]{width:8rem;font-size:x-large}"]}),t})()}];let g=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[l.Bz.forChild(Z)],l.Bz]}),t})(),T=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[d.ez]]}),t})(),f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[d.ez,g,T]]}),t})()}}]);