let story_json=new Array();
var tuesday=document.getElementById("tuesday");
var tue_text_view;
var tue_text_block;
var tue_text_element;
var tue_name_block=document.createElement("div");
var languare;
var scene=0;
var dialog=0;
var dialog_text;
var dialog_speed=50;
var dialog_letter=0;
var dialog_timeout;
var tue_story;
var tue_bg_music;
var tue_fullScreen=false;
var arr_dialog
var timers
document.oncontextmenu = cmenu; function cmenu(){return false;}
window.onmousedown = window.onselectstart = function(){return false;};
document.addEventListener('keydown',function(event){
    var k=event.code;
    if(k == story_json.parameters.key.next){go_story();}
    else if(k == story_json.parameters.key.back){back_story();}
    else if(k == story_json.parameters.key.main){var g=story_json.parameters.launch_story;go_to(g);}
    else if(k == story_json.parameters.key.save){save_stag('bookmark');}
    else if(k == story_json.parameters.key.load){load_stag('bookmark');}
    else if(k == story_json.parameters.key.autosave){load_stag('auto');}
    else if(k == story_json.parameters.key.full_screen){full_screen();}
});
function get_lang(){
    if(navigator.languages != undefined){languare=navigator.languages[0].substring(0,2);}
    else {languare=navigator.languagesubstring(0,2)}
    var support;
    for(var i=0;i < story_json.parameters.languares.length;i++){
        if(languare == story_json.parameters.languares[i]){support=true }
    }
    if(!support){languare=story_json.parameters.languares[0]}
} function load_story(tip,url){
    if(tip == 'data'){
        story_json=url;
        base_creation();
        tuesday.dispatchEvent(new Event('script_loaded'));
		creation_sound();
    } else if(tip == 'file'){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if(this.readyState == 4 &&(this.status == 200 || this.status == 0)){
				try {story_json=JSON.parse(this.responseText);} 
				catch(e){ if(this.status > 0){alert('Json structure error')}}
                base_creation();
                tuesday.dispatchEvent(new Event('script_loaded'));
				creation_sound();
            }
        };
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
		xmlhttp.onerror=function(){
			if(this.status == 0){alert( 'Error load json file Cross-Origin Resource Sharing(CORS)' );}
		}
    }
} function base_creation(){
    get_lang();
	if(story_json.parameters.style_file){add_style(story_json.parameters.style_file)}
    dialog_speed=story_json.parameters.text_panel.dialog_speed;
    if(story_json.parameters.title){
        if(story_json.parameters.title[languare]){document.title=story_json.parameters.title[languare];
        }else{document.title=story_json.parameters.title;}
    }
    tuesday.style.backgroundRepeat="no-repeat";
    tuesday.style.backgroundSize="cover";
    tuesday.style.backgroundPosition="center";
    tuesday.style.position="relative"
    tuesday.style.overflow="hidden";
    tuesday.innerHTML="<table id='tue_text_block' align='center'><tbody><tr><td id='tue_text_element'><div id='tue_text_view'></div></td></tr></tbody></table>";
    tue_text_block=document.getElementById("tue_text_block");
	tue_text_element=document.getElementById("tue_text_element");
	tue_text_element.style.position="relative";
    if(story_json.parameters.text_panel.className){tue_text_block.className=story_json.parameters.text_panel.className;}
    if(story_json.parameters.text_panel.style){tue_text_block.style=story_json.parameters.text_panel.style;}
    tue_text_block.style.position="absolute";
	if(story_json.parameters.text_panel.size){
		tue_text_block.style.width=story_json.parameters.text_panel.size[0];
		tue_text_block.style.height=story_json.parameters.text_panel.size[1];
	}
	if(story_json.parameters.text_panel.position){
		tue_text_block.style.left=(story_json.parameters.text_panel.position[0] != 0)?story_json.parameters.text_panel.position[0]:"0";
		tue_text_block.style.right=(story_json.parameters.text_panel.position[1] != 0)?story_json.parameters.text_panel.position[1]:"0";
		if(story_json.parameters.text_panel.position[2] != 0){tue_text_block.style.top=story_json.parameters.text_panel.position[2];}
		if(story_json.parameters.text_panel.position[3] != 0){tue_text_block.style.bottom=story_json.parameters.text_panel.position[3];}
	}else{
		tue_text_block.style.left="0";
		tue_text_block.style.right="0";
	}
	if(story_json.parameters.text_panel.indent_bottom){tue_text_block.style.bottom=story_json.parameters.text_panel.indent_bottom;}
    tue_text_block.style.zIndex=1000;
    tue_text_block.style.borderSpacing=0;
    tue_text_view=document.getElementById("tue_text_view");
    tue_text_view.style.boxSizing="border-box";
    tue_text_view.style.padding=story_json.parameters.text_panel.indent_text;
    tue_text_view.style.fontSize=story_json.parameters.text_panel.size_text;
	tue_text_view.style.height="100%";
    if(story_json.parameters.name_panel){
        if(story_json.parameters.name_panel.className){tue_name_block.className=story_json.parameters.name_panel.className;}
        if(story_json.parameters.name_panel.style){tue_name_block.style=story_json.parameters.name_panel.style;}
		if(story_json.parameters.name_panel.color){tue_name_block.style.backgroundColor=story_json.parameters.name_panel.color;}
        if(story_json.parameters.name_panel.color_text){tue_name_block.style.color=story_json.parameters.name_panel.color_text;} else {tue_name_block.style.color=story_json.parameters.text_panel.color_text}
		tue_name_block.style.position="absolute";
        tue_name_block.id="tue_name_block";
        tue_name_block.style.padding=story_json.parameters.name_panel.indent_text;
        tue_name_block.style.fontSize=story_json.parameters.name_panel.size_text;
        tue_name_block.style.textAlign="center";
        if(tue_name_block.style.width=story_json.parameters.name_panel.size[0]!=0){tue_name_block.style.width=story_json.parameters.name_panel.size[0];}
        tue_name_block.style.height=story_json.parameters.name_panel.size[1];
        tue_name_block.style.lineHeight=story_json.parameters.name_panel.size[1];
        if(story_json.parameters.name_panel.position[0]!=0){tue_name_block.style.left=story_json.parameters.name_panel.position[0];}
        if(story_json.parameters.name_panel.position[1]!=0){tue_name_block.style.right=story_json.parameters.name_panel.position[1];}
        if(story_json.parameters.name_panel.position[2]!=0){tue_name_block.style.top=story_json.parameters.name_panel.position[2];}
        if(story_json.parameters.name_panel.position[3]!=0){tue_name_block.style.bottom=story_json.parameters.name_panel.position[3];}
        tue_name_block.style.zIndex=1001;
        tue_text_element.appendChild(tue_name_block);
    }
    tue_bg_music=document.createElement("AUDIO");
    tue_bg_music.id="tue_bg_music";
    tuesday.appendChild(tue_bg_music);
    if(story_json.parameters.launch_story){
		tue_story=story_json.parameters.launch_story;
	}else{
		for(var i=0;i < 2;i++){
			if(Object.getOwnPropertyNames(story_json)[i] != "parameters"){
				story_json.parameters.launch_story=Object.getOwnPropertyNames(story_json)[1] ;
				tue_story=story_json.parameters.launch_story;
				break;
			}
		}
	}
	tuesday.dispatchEvent(new Event('script_executed'));
    if (localStorage.getItem("tue_auto_data" && story_json.parameters.autosave)){story_json.parameters.variables=JSON.parse(localStorage.getItem("tue_auto_data"));}
	creation_buttons();
    creation_scene();
} function creation_buttons(){
    for(i=0;i < story_json.parameters.buttons.length;i++){
        var button=document.createElement("div");
        var v='';
        if(story_json.parameters.buttons[i].sound){v+=(story_json.parameters.buttons[i].sound)?get_sound(story_json.parameters.buttons[i].sound):""+((story_json.parameters.buttons[i].sound_stop)?";"+get_stop_sound(story_json.parameters.buttons[i].sound_stop):"")+";"}
        if(story_json.parameters.buttons[i].js){v+=story_json.parameters.buttons[i].js}
        button.setAttribute("onclick",v+";")
        if(story_json.parameters.buttons[i].className){button.className=story_json.parameters.buttons[i].className;}
        if(story_json.parameters.buttons[i].style){button.style=story_json.parameters.buttons[i].style;}
        if(story_json.parameters.buttons[i].text && (typeof story_json.parameters.buttons[i].text!=='object' || (story_json.parameters.buttons[i].text[languare] && typeof story_json.parameters.buttons[i].text[languare]!=='object'))){
            button.innerHTML=((story_json.parameters.buttons[i].text[languare])?story_json.parameters.buttons[i].text[languare]:story_json.parameters.buttons[i].text);
            button.style.padding=story_json.parameters.buttons[i].indent_text;
            button.style.textAlign="center";
            button.style.color=story_json.parameters.buttons[i].color_text;
            button.style.fontSize=story_json.parameters.buttons[i].size_text;
        }
        button.style.zIndex=2000+i;
        button.id=story_json.parameters.buttons[i].name;
        button.classList.add("tue_controll");
        button.style.position="absolute";
        button.style.width=story_json.parameters.buttons[i].size[0];
        button.style.height=story_json.parameters.buttons[i].size[1];
        button.style.backgroundColor=story_json.parameters.buttons[i].color;
        button.style.backgroundRepeat="no-repeat";
        button.style.backgroundPosition="center";
        if(story_json.parameters.buttons[i].art){button.style.backgroundImage="url('"+art_data(story_json.parameters.buttons[i].art)+"')";}
        if(story_json.parameters.buttons[i].art_size){button.style.backgroundSize=story_json.parameters.buttons[i].art_size[0]+" "+story_json.parameters.buttons[i].art_size[1];}
        if(story_json.parameters.buttons[i].position[0] != 0){button.style.left=story_json.parameters.buttons[i].position[0];}
        if(story_json.parameters.buttons[i].position[1] != 0){button.style.right=story_json.parameters.buttons[i].position[1];}
        if(story_json.parameters.buttons[i].position[2] != 0){button.style.top=story_json.parameters.buttons[i].position[2];}
        if(story_json.parameters.buttons[i].position[3] != 0){button.style.bottom=story_json.parameters.buttons[i].position[3];}
        tuesday.appendChild(button);
    }
    if(document.getElementById('tue_next')){document.getElementById('tue_next').addEventListener('click',function(){go_story()});}
    if(document.getElementById('tue_back')){document.getElementById('tue_back').addEventListener('click',function(){back_story()});}
    if(document.getElementById('tue_home')){
        var g=story_json.parameters.launch_story;
        document.getElementById('tue_home').addEventListener('click',function(){go_to(g)});
    }
    if(document.getElementById('tue_save')){document.getElementById('tue_save').addEventListener('click',function(){save_stag('bookmark')});}
    if(document.getElementById('tue_load')){document.getElementById('tue_load').addEventListener('click',function(){load_stag('bookmark')});}
    if(document.getElementById('tue_fullScreen')){document.getElementById('tue_fullScreen').addEventListener('click',function(){full_screen()});}
} function creation_scene(){
    arr_dialog = story_json[tue_story][scene]
    del_element("tue_html_scene");
    if(arr_dialog.legacy_choice){
        for(var i=0;i < arr_dialog.legacy_choice.length;i++){
            var choice_n=arr_dialog.legacy_choice[i][0];
            var choice_s=arr_dialog.legacy_choice[i][1];
            var choice_v=arr_dialog.legacy_choice[i][2];
            var choice_g=arr_dialog.legacy_choice[i][3];
            if(choice_s == ">" && story_json.parameters.variables[choice_n] > choice_v){
                go_to(choice_g);
                break;
            } else if(choice_s == "<" && story_json.parameters.variables[choice_n] < choice_v){
                go_to(choice_g);
                break;
            } else if(choice_s == "=" && story_json.parameters.variables[choice_n] == choice_v){
                go_to(choice_g);
                break;
            } else if(arr_dialog.legacy_choice[i].go_to){
                go_to(arr_dialog.legacy_choice[i].go_to);
                break;
            } else if(i == arr_dialog.legacy_choice.length-1){
                scene++;
                dialog=0;
                creation_scene();
            }
        }
    }
    if(arr_dialog.background_class){
        tuesday.className=arr_dialog.background_class;
    } else {tuesday.className=""}
    if(arr_dialog.background_color){
        tuesday.style.backgroundColor=arr_dialog.background_color;
    }
    if(arr_dialog.background_image){tuesday.style.backgroundImage="url('"+art_data(arr_dialog.background_image)+"')";}
	if(document.getElementById("tue_home")){
		if(tue_story == story_json.parameters.launch_story){document.getElementById("tue_home").style.visibility="hidden";}
		else {document.getElementById("tue_home").style.visibility="visible";}
	}
    if (arr_dialog.html){
        if (arr_dialog.html[languare]){
            var html=document.createElement("div");
            html.className='tue_html_scene';
            html.innerHTML=arr_dialog.html[languare];
            tuesday.appendChild(html);
        } else {
        var html=document.createElement("div");
        html.className='tue_html_scene';
        html.innerHTML=arr_dialog.html;
        tuesday.appendChild(html);
        }
    }
    if(arr_dialog.background_music){search_music();}
    if(arr_dialog.dialogs&&arr_dialog.dialogs.length>0){creation_dialog();} else {tue_text_block.style.visibility='hidden';}
} function creation_dialog(){
        arr_dialog = story_json[tue_story][scene].dialogs[dialog]
		if(scene == story_json[tue_story].length-1 && dialog == story_json[tue_story][scene].dialogs.length-1 && !arr_dialog.go_to){document.getElementById('tue_next').style.visibility='hidden';}
		else {document.getElementById("tue_next").style.visibility="visible";} 
		if(scene == 0 && dialog == 0 && !arr_dialog.back_to){document.getElementById('tue_back').style.visibility='hidden'}
		else {document.getElementById("tue_back").style.visibility="visible";}
		if(arr_dialog.controll == 'hidden'){
			var buttons=document.getElementById("tuesday").getElementsByClassName("tue_controll");
			for(var i=0;i < buttons.length;i++){buttons[i].style.visibility="hidden";}
		} else if(arr_dialog.controll == 'visible'){
			var buttons=document.getElementById("tuesday").getElementsByClassName("tue_controll");
			for(var i=0;i < buttons.length;i++){buttons[i].style.visibility="visible";}
		}
        if(arr_dialog.text && arr_dialog.text!='' && arr_dialog.text[languare]!=''){
            tue_text_block.style.visibility='visible';
            tue_text_view.innerHTML="";
            values_in_text(false);
            clearTimeout(dialog_timeout);
            anim_text();
            if(arr_dialog.text.className){ tue_text_block.className=arr_dialog.text.className}
			if(arr_dialog.text.style){tue_text_block.style=arr_dialog.text.style}
        } else if(arr_dialog.text_add && arr_dialog.text_add!='' && arr_dialog.text_add[languare]!=''){
			tue_text_block.style.visibility='visible';
			tue_text_view.innerHTML="";
			values_in_text(true);
            clearTimeout(dialog_timeout);
            anim_text();
		}else{tue_text_block.style.visibility='hidden';}
		if(arr_dialog.color){tue_text_block.style.backgroundColor=arr_dialog.color;}
        else if(story_json.parameters.text_panel.color){tue_text_block.style.backgroundColor=story_json.parameters.text_panel.color;}
        if(arr_dialog.color_text){tue_text_view.style.color=arr_dialog.color_text;}
		else if(story_json.parameters.text_panel.color_text){tue_text_view.style.color=story_json.parameters.text_panel.color_text;}
        if(arr_dialog.name){
            if(arr_dialog.name[languare]){
                tue_name_block.innerHTML=arr_dialog.name[languare]
                tue_name_block.style.backgroundColor=arr_dialog.name.color;
                tue_name_block.style.color=arr_dialog.name.color_text;
                if(arr_dialog.name.className){ tue_name_block.className=arr_dialog.name.className}
            } else if(story_json.parameters.characters){
				if(story_json.parameters.characters[arr_dialog.name]){
                tue_name_block.innerHTML=story_json.parameters.characters[arr_dialog.name][languare]
                tue_name_block.style.backgroundColor=story_json.parameters.characters[arr_dialog.name].color;
                tue_name_block.style.color=story_json.parameters.characters[arr_dialog.name].color_text;
					if(story_json.parameters.characters[arr_dialog.name].className){
						tue_name_block.className=story_json.parameters.characters[arr_dialog.name].className
					}
				}else{
					tue_name_block.innerHTML=arr_dialog.name
					tue_name_block.style.backgroundColor=arr_dialog.name.color;
					tue_name_block.style.color=arr_dialog.name.color_text;
					if(arr_dialog.name.className){ tue_name_block.className=arr_dialog.name.className}
				}	
			}else{
				tue_name_block.innerHTML=arr_dialog.name
			}
            tue_name_block.style.visibility='visible';
        }else{tue_name_block.style.visibility='hidden';}
        if(arr_dialog.art){
            var old=document.getElementById("tuesday").getElementsByClassName("tue_art");
            var src=false
            if (old.length>0){
                for(d=0;d<old.length;d++){old[d].classList.add("img_del");}
                for(i=0;i<arr_dialog.art.length;i++){
                    src=false;
                    for(o=0;o<old.length;o++){
                        if(arr_dialog.art[i].url==old[o].getAttribute('src')||arr_dialog.art[i].url[languare]==old[o].getAttribute('src')){
                            if(arr_dialog.art[i].style){old[o].style=arr_dialog.art[i].style;}
                            if(arr_dialog.art[i].move&&arr_dialog.art[i].move!=0){
                                old[o].style.transitionDuration=arr_dialog.art[i].move+"s";
                                if(arr_dialog.art[i].speed&&arr_dialog.art[i].speed!=''){old[o].style.transitionTimingFunction=arr_dialog.art[i].speed;} else {old[o].style.transitionTimingFunction=null}
                            } else {old[o].style.transitionDuration=null;old[o].style.transitionTimingFunction=null}
                            if(arr_dialog.art[i].opacity){old[o].style.opacity=arr_dialog.art[i].opacity;} else {old[o].style.opacity=null}
                            if(arr_dialog.art[i].fit)old[o].style.objectFit=arr_dialog.art[i].fit;
                            if(arr_dialog.art[i].size){
                                old[o].style.width=arr_dialog.art[i].size[0];
                                old[o].style.height=arr_dialog.art[i].size[1];
                            }
                            if(arr_dialog.art[i].position[0]!=0){old[o].style.left=arr_dialog.art[i].position[0];}
                            if(arr_dialog.art[i].position[1]!=0){
                                old[o].style.left="calc(100% - "+arr_dialog.art[i].position[1]+" - "+arr_dialog.art[i].size[0]+")";
                            }
                            if(arr_dialog.art[i].position[2]!=0){old[o].style.top=arr_dialog.art[i].position[2];}
                            if(arr_dialog.art[i].position[3]!=0){
                                old[o].style.top="calc(100% - "+arr_dialog.art[i].position[3]+" - "+arr_dialog.art[i].size[1]+")";
                            }
                            src=true;
                            old[o].classList.remove("img_del");
                            break;
                        }
                    }
                    if(src==false){creation_art(i);}
                }
                del_element("img_del");
            } else {
                for(i=0;i < arr_dialog.art.length;i++){creation_art(i);}
            }
            function creation_art(i){
                var art=document.createElement("img");
                art.src=art_data(arr_dialog.art[i].url);
                art.classList.add("tue_art")
                art.style="user-select:text;"+((arr_dialog.art[i].style)?arr_dialog.art[i].style:"")
                art.style.position="absolute";
                if(arr_dialog.art[i].fit)art.style.objectFit=arr_dialog.art[i].fit;
                if(arr_dialog.art[i].opacity){art.style.opacity=arr_dialog.art[i].opacity;} else {art.style.opacity=null}
                if(arr_dialog.art[i].size){
                    art.style.width=arr_dialog.art[i].size[0];
                    art.style.height=arr_dialog.art[i].size[1];
                }
                if(arr_dialog.art[i].position[0]!=0){art.style.left=arr_dialog.art[i].position[0];}
                if(arr_dialog.art[i].position[1]!=0){art.style.left="calc(100% - "+arr_dialog.art[i].position[1]+" - "+arr_dialog.art[i].size[0]+")";}
                if(arr_dialog.art[i].position[2]!=0){art.style.top=arr_dialog.art[i].position[2];}
                if(arr_dialog.art[i].position[3]!=0){art.style.top="calc(100% - "+arr_dialog.art[i].position[3]+" - "+arr_dialog.art[i].size[1]+")";}
                art.setAttribute("draggable","false");
                tuesday.appendChild(art);
            }
        } else {del_element("tue_art");}
        if(arr_dialog.choice){
			tue_next.style.visibility='hidden';
            for(i=0;i < arr_dialog.choice.length;i++){
                var choice=document.createElement("div");
                if(arr_dialog.choice[i].className){choice.className=arr_dialog.choice[i].className;}
                if(arr_dialog.choice[i].style){choice.style=arr_dialog.choice[i].style;}
                choice.classList.add("tue_choice");
                choice.style.position="absolute";
                choice.style.backgroundColor=arr_dialog.choice[i].color;
                choice.style.backgroundRepeat="no-repeat";
                choice.style.backgroundPosition="center";
                if(arr_dialog.choice[i].art){choice.style.backgroundImage="url('"+art_data(arr_dialog.choice[i].art)+"')";}
				if(arr_dialog.choice[i].size){
					if(arr_dialog.choice[i].size[0] != 0){
						choice.style.width=arr_dialog.choice[i].size[0];}
					if(arr_dialog.choice[i].size[1] != 0){
						choice.style.height=arr_dialog.choice[i].size[1];
						choice.style.lineHeight=arr_dialog.choice[i].size[1];
					}
				}
                if(arr_dialog.choice[i].art_size){
                    choice.style.backgroundSize=arr_dialog.choice[i].art_size[0]+" "+arr_dialog.choice[i].art_size[1];
                }
                if(arr_dialog.choice[i].position[0] != 0){choice.style.left=arr_dialog.choice[i].position[0];}
                if(arr_dialog.choice[i].position[1] != 0){choice.style.right=arr_dialog.choice[i].position[1];}
                if(arr_dialog.choice[i].position[2] != 0){choice.style.top=arr_dialog.choice[i].position[2];}
                if(arr_dialog.choice[i].position[3] != 0){choice.style.bottom=arr_dialog.choice[i].position[3];}
                choice.style.color=arr_dialog.choice[i].color_text;
                choice.style.padding=arr_dialog.choice[i].indent_text;
                choice.style.fontSize=arr_dialog.choice[i].size_text;
                choice.style.textAlign="center";
                choice.style.zIndex=1001+i;
                if(arr_dialog.choice[i].text && (typeof arr_dialog.choice[i].text!=='object' || (arr_dialog.choice[i].text[languare] && typeof arr_dialog.choice[i].text[languare]!=='object'))){
                    if(arr_dialog.choice[i].text[languare]){choice.innerHTML=arr_dialog.choice[i].text[languare];}
                    else {choice.innerHTML=arr_dialog.choice[i].text;}
                }
				var v='';
				if(arr_dialog.choice[i].variables){
					for(var g=0;g < arr_dialog.choice[i].variables.length;g++){
						if(arr_dialog.choice[i].variables[g][1] == "add"){
							v += "story_json.parameters.variables."+arr_dialog.choice[i].variables[g][0]+"+="+arr_dialog.choice[i].variables[g][2]+";"
						}
						else if(arr_dialog.choice[i].variables[g][1] == "set"){
							v += "story_json.parameters.variables."+arr_dialog.choice[i].variables[g][0]+"="+arr_dialog.choice[i].variables[g][2]+";"
						}
					}
				}
                if (arr_dialog.choice[i].js){v+=arr_dialog.choice[i].js+";"}
                if (arr_dialog.choice[i].go_to){
                    var g=arr_dialog.choice[i].go_to;
                    if (g == "tue_go"){choice.setAttribute("onclick","del_element('tue_choice'); "+v+"go_story(true);"+add_sound());}
                    else if (g == "tue_load_autosave"){choice.setAttribute("onclick",v+"load_stag('auto');"+add_sound());}
                    else if (g == "load"||g == "tue_load"){choice.setAttribute("onclick",v+"load_stag('bookmark');"+add_sound());}
                    else if (g == "tue_save"){choice.setAttribute("onclick",v+"save_stag('bookmark');"+add_sound());}
                    else if (g == "tue_no"||g == ""){choice.setAttribute("onclick",v)}
                    else if (g == "tue_fullScreen"){choice.setAttribute("onclick",v+"full_screen();");}
                    else if (g == "tue_home"){choice.setAttribute("onclick",v+'document.getElementById("tue_home").addEventListener("click",function(){go_to("'+story_json.parameters.launch_story+'")});');}
                    else if (g == "tue_back"){choice.setAttribute("onclick",v+"back_story();");}
                    else if (g == "tue_next"){choice.setAttribute("onclick",v+"go_story();");}
                    else {choice.setAttribute("onclick",v+"go_to('"+g+"');"+add_sound())}
                } else {choice.setAttribute("onclick",v+"go_story(true);del_element('tue_choice');"+add_sound());}
                tuesday.appendChild(choice);
				function add_sound(){
					var s='';
					if(arr_dialog.choice[i].sound){s=get_sound(arr_dialog.choice[i].sound)};
					if(arr_dialog.choice[i].sound_stop){s += get_stop_sound(arr_dialog.choice[i].sound_stop)};
					return s;
				}
            }
        }
        if (arr_dialog.html){
            if (arr_dialog.html[languare]){
                var html=document.createElement("div");
                html.className='tue_html_dialog';
                html.innerHTML=arr_dialog.html[languare];
                tuesday.appendChild(html);
            } else {
                var html=document.createElement("div");
                html.className='tue_html_dialog';
                html.innerHTML=arr_dialog.html;
                tuesday.appendChild(html);
            }
        }
		if(arr_dialog.variables){
			for(var i=0;i < arr_dialog.variables.length;i++){
				var choice_n=arr_dialog.variables[i][0]
				if(arr_dialog.variables[i][1] == "add"){
					story_json.parameters.variables[choice_n] += arr_dialog.variables[i][2];
                    tuesday.dispatchEvent(new Event( arr_dialog.variables[i][0]+'_add'));
				} else if(arr_dialog.variables[i][1] == "set"){story_json.parameters.variables[choice_n]=arr_dialog.variables[i][2];}
                    tuesday.dispatchEvent(new Event( arr_dialog.variables[i][0]+'_set'));
			}
		}
        if(arr_dialog.event){
            tuesday.dispatchEvent(new Event( arr_dialog.event ));
        }
		if(arr_dialog.sound_stop){
			var s=arr_dialog.sound_stop;
			sound_stop((s[languare])?s[languare]:s);
		}
		if(arr_dialog.sound){
			var s=arr_dialog.sound;
			sound_play((s[languare])?s[languare]:s )
		}
        if(arr_dialog.js){eval(arr_dialog.js)}
        clearTimeout(timers);
        if(arr_dialog.timer){timers=setTimeout(function(){if(arr_dialog.timer[1]=='tue_go'){go_story(true);} else {go_to(arr_dialog.timer[1])}},arr_dialog.timer[0]);}
		tuesday.dispatchEvent(new Event('creation_dialog'));
} function values_in_text(add){
    arr_dialog = story_json[tue_story][scene].dialogs[dialog]
	var str=""
	if(!add){
		dialog_letter=0
		str=(arr_dialog.text[languare])?arr_dialog.text[languare]:arr_dialog.text;
	}else{
		dialog_letter=dialog_text.length;
		str=dialog_text
		str +=(arr_dialog.text_add[languare])?arr_dialog.text_add[languare]:arr_dialog.text_add;
	}
    let regexp=/<(.*?)>/g;
    let matchAll=str.matchAll(regexp);
    matchAll=Array.from(matchAll);
    for(var i=0;i < matchAll.length;i++){
        let firstMatch=matchAll[i];
        str=str.replace( firstMatch[0],story_json.parameters.variables[firstMatch[1]])
    };
	dialog_text=str
} function go_story(choice){
    arr_dialog = story_json[tue_story][scene].dialogs[dialog]
	if(!arr_dialog.choice || choice){
		if(arr_dialog.go_to){
			var go=arr_dialog.go_to;
			go_to(go)
		} else if(dialog < story_json[tue_story][scene].dialogs.length - 1){
			dialog++;
			if(arr_dialog.text){
				if(arr_dialog.text[languare] == 'skip'){go_story()}
				else {creation_dialog();};
			} else if(arr_dialog.text_add){
				if(arr_dialog.text_add[languare] == 'skip'){go_story()}
				else {creation_dialog();};
			}else{ creation_dialog();}
		}else{
			scene++;
			if(scene >= story_json[tue_story].length){scene=story_json[tue_story].length - 1;}
			else {
				dialog=0;
				creation_scene();
			}
		}
        if(story_json.parameters.autosave){save_stag('auto')};
	} 
} function back_story(){
    arr_dialog = story_json[tue_story][scene].dialogs[dialog]
	del_element("tue_choice")
    del_element("tue_html_dialog")
    if(arr_dialog.back_to){
        var go=arr_dialog.back_to;
        go_to(go)
    } else if(dialog > 0){
        dialog -= 1;
		if(arr_dialog.text){
			if(arr_dialog.text[languare] == 'skip'){back_story()}
			else {creation_dialog();};
		} else if(arr_dialog.text_add){
			if(arr_dialog.text_add[languare] == 'skip'){back_story()}
			else {
				if(arr_dialog.text_add[languare]){
					dialog_text=dialog_text.replace(arr_dialog.text_add[languare],"")
				}else{dialog_text=dialog_text.replace(arr_dialog.text_add,"")};
				if(story_json[tue_story][scene].dialogs[dialog+1].text_add[languare]){
					dialog_text=dialog_text.replace(story_json[tue_story][scene].dialogs[dialog+1].text_add[languare],"")
				}else{dialog_text=dialog_text.replace(story_json[tue_story][scene].dialogs[dialog+1].text_add,"")};
				creation_dialog();
			};
		} else {
			creation_dialog();
			del_element("tue_choice")
            del_element("tue_html_dialog")
		};
    }else{
        scene -= 1;
        if(scene < 0){ scene=0;}
        else {dialog=story_json[tue_story][scene].dialogs.length - 1;creation_scene();}
    } if(story_json.parameters.autosave){save_stag('auto')}
} function save_stag(tip){
    localStorage.setItem("tue_"+tip+"_scene",scene);
    localStorage.setItem("tue_"+tip+"_dialog",dialog);
    localStorage.setItem("tue_"+tip+"_story",tue_story);
    if(story_json.parameters.variables){localStorage.setItem("tue_"+tip+"_data",JSON.stringify( story_json.parameters.variables ));};
    if(tip == "bookmark"){tuesday.dispatchEvent(new Event('save'));}
} function load_stag(tip){
    del_element("tue_choice")
    del_element("tue_html_sc")
    scene=localStorage.getItem("tue_"+tip+"_scene");
    dialog=localStorage.getItem("tue_"+tip+"_dialog");
    tue_story=localStorage.getItem("tue_"+tip+"_story");
    story_json.parameters.variables=JSON.parse(localStorage.getItem("tue_"+tip+"_data"));
    creation_scene();
	search_music();
    tuesday.dispatchEvent(new Event('load'));
} function go_to(go){
    del_element("tue_choice");
    del_element("tue_html_dialog");
    dialog=0;
    scene=0;
    tue_story=go;
    creation_scene();
} function del_element(element){
    var del=document.getElementById("tuesday").getElementsByClassName(element);
    var len=del.length;
    for(var i=0;i < len;i++){del[0].parentNode.removeChild(del[0]);}
} function anim_text(){
    if(dialog_speed == 0){tue_text_view.innerHTML=dialog_text;}
    else if(dialog_speed != 0 && dialog_letter < dialog_text.length){dialog_timeout=setTimeout(add_letter,dialog_speed);}
	else if(dialog_letter == dialog_text.length){tue_text_view.innerHTML=dialog_text;tuesday.dispatchEvent(new Event('dialog_end'));}
} function add_letter(){
    tue_text_view.innerHTML=dialog_text.slice(0,dialog_letter);
    dialog_letter++;
    anim_text();
} function search_music(){
	 for(var i=scene;i >= 0;i--){
		if(story_json[tue_story][i].background_music){
			if(tue_bg_music.canPlayType("audio/mpeg")){
				if(story_json[tue_story][i].background_music.indexOf("blob:") > -1){
					tue_bg_music.src=story_json[tue_story][i].background_music;
				} else if(story_json[tue_story][i].background_music.indexOf(".mp3") > -1){
					tue_bg_music.src=story_json[tue_story][i].background_music;
				}else{tue_bg_music.src=story_json[tue_story][i].background_music+".mp3";}
            }else{tue_bg_music.src=story_json[tue_story][i].background_music+".ogg";}
			tue_bg_music.loop=true;
			tue_bg_music.play();
			break;
		}
	}
} function creation_sound(){
	var i=0;
	while(Object.keys( story_json.parameters.sounds)[i]){
		var audio=document.createElement("audio");
		audio.preload="auto"
		audio.id=Object.keys( story_json.parameters.sounds)[i];
		if(audio.canPlayType("audio/mpeg")){
			if(story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]].indexOf("blob:") > -1){
				audio.src=story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]];
			} else if(story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]].indexOf(".mp3") > -1){
				audio.src=story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]];
			}else{audio.src=story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]]+".mp3";}
		}else{audio.src=story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]]+".ogg";}
		tuesday.appendChild(audio);
		i++;
	}
} function get_sound(src){
	return(src[languare])?"sound_play('"+src[languare]+"');":"sound_play('"+src+"');" ;	
} function get_stop_sound(src){
	return(src[languare])?"sound_stop('"+src[languare]+"');":"sound_stop('"+src+"');" ;	
} function sound_play(id){
	document.getElementById(id).currentTime=0;
	document.getElementById(id).volume=1;
	document.getElementById(id).play();
} function sound_stop(id){
	document.getElementById(id).currentTime=0;
	document.getElementById(id).pause();
} function add_style(file){
    var newlink=document.createElement("link");
    newlink.setAttribute("rel","stylesheet");
    newlink.setAttribute("type","text/css");
    newlink.setAttribute("href",file);
    document.getElementsByTagName("head").item(0).appendChild(newlink);
} function full_screen(){
	if(!tue_fullScreen){
		tue_fullScreen=true;
		if(tuesday.requestFullscreen){tuesday.requestFullscreen();} 
		else if(tuesday.mozRequestFullScreen){tuesday.mozRequestFullScreen();} 
		else if(tuesday.webkitRequestFullscreen){tuesday.webkitRequestFullscreen();} 
		else if(tuesday.msRequestFullscreen){tuesday.msRequestFullscreen();}
	}else{
		tue_fullScreen=false;
		if(document.exitFullscreen){document.exitFullscreen();} 
		else if(document.mozCancelFullScreen){document.mozCancelFullScreen();} 
		else if(document.webkitExitFullscreen){document.webkitExitFullscreen();} 
		else if(document.msExitFullscreen){document.msExitFullscreen();}
	}
} function art_data(data){
    if (data[languare]){return data[languare]}
    else {return data}
}
