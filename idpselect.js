var JSON;

if(!JSON){
	JSON={}
}

function(){
	function f(n){
		return n<10?"0"+n:n
	}
	if (typeof Date.prototype.toJSON!=="function") {
		Date.prototype.toJSON=function(key){
			return isFinite(this.valueOf())? this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
		};

		String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){
			return this.valueOf()
		}
	}

	var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap,indent,meta={ "\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},
			rep;

	function quote(string){
		escapable.lastIndex=0;
		return escapable.test(string)?'"'+string.replace(escapable,function(a){
			var c=meta[a];
			return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
		})+'"':'"'+string+'"'
	}

	function str(key,holder){
		var i,k,v,length,mind=gap,partial,value=holder[key];
		if(value&&typeof value==="object"&&typeof value.toJSON==="function"){
			value=value.toJSON(key)
		}
		if(typeof rep==="function"){
			value=rep.call(holder,key,value)
		}
		switch(typeof value){
			case"string":return quote(value);
			case"number":return isFinite(value)?String(value):"null";
			case"boolean":case"null":return String(value);
			case"object":if(!value){
				return"null"
			}
			gap+=indent;
			partial=[];
			if(Object.prototype.toString.apply(value)==="[object Array]"){
				length=value.length;
				for(i=0;i<length;i+=1){
					partial[i]=str(i,value)||"null"
				}
				v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
				gap=mind;
				return v
			}
			if(rep&&typeof rep==="object"){
				length=rep.length;
				for(i=0;i<length;i+=1){
					if(typeof rep[i]==="string"){
						k=rep[i];v=str(k,value);
						if(v){
							partial.push(quote(k)+(gap?": ":":")+v)
						}
					}
				}
			}
			else{
				for(k in value){
					if(Object.prototype.hasOwnProperty.call(value,k)){
						v=str(k,value);
						if(v){
							partial.push(quote(k)+(gap?": ":":")+v)
						}
					}
				}
			}
			v=partial.length===0 ? "{}" : gap ? "{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}" : "{"+partial.join(",")+"}";
			gap=mind;
			return v
		}
	}
	if(typeof JSON.stringify!=="function"){
		JSON.stringify=function(value,replacer,space){
			var i;gap="";
			indent="";
			if(typeof space==="number"){
				for(i=0;i<space;i+=1){
					indent+=" "
				}
			}
			else{
				if(typeof space==="string"){
					indent=space
				}
			}
			rep=replacer;
			if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){
				throw new Error("JSON.stringify")
			}
			return str("",{
				"":value
			})
		}
	}
	if(typeof JSON.parse!=="function"){
		JSON.parse=function(text,reviver){
			var j;function walk(holder,key){
				var k,v,value=holder[key];
				if(value&&typeof value==="object"){
					for(k in value){
						if(Object.prototype.hasOwnProperty.call(value,k)){
							v=walk(value,k);
							if(v!==undefined){
								value[k]=v
							}else{
								delete value[k]
							}
						}
					}
				}
				return reviver.call(holder,key,value)
			}
			text=String(text);cx.lastIndex=0;
			if(cx.test(text)){
				text=text.replace(cx,function(a){
					return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
				})
			}
			if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
				j=eval("("+text+")");
				return typeof reviver==="function"?walk({"":j},""):j
			}
			throw new SyntaxError("JSON.parse")}
	}
}
());

function TypeAheadControl(l,f,j,g,i,b,h,e,a,c,d,k){
	this.elementList=l;this.textBox=f;this.origin=j;this.submit=g;this.results=0;this.alwaysShow=c;this.maxResults=d;this.ie6hack=a;this.maxchars=i;this.getName=b;this.getEntityId=h;this.geticon=e;this.getKeywords=k}
	TypeAheadControl.prototype.draw=function(){
		var a=this;this.dropDown=document.createElement("div");this.dropDown.className="IdPSelectDropDown";this.dropDown.style.visibility="hidden";this.dropDown.style.width=this.textBox.offsetWidth;this.dropDown.current=-1;document.body.appendChild(this.dropDown);this.dropDown.onmouseover=function(b){
			if(!b){
				b=window.event}
				var c;if(b.target){
					c=b.target}
					if(typeof c=="undefined"){
						c=b.srcElement}
						a.select(c)}
						;this.dropDown.onmousedown=function(b){
							if(-1!=a.dropDown.current){
								a.textBox.value=a.results[a.dropDown.current][0]}
							}
							;this.textBox.onkeyup=function(b){
								if(!b){
									b=window.event}
									a.handleKeyUp(b)}
									;this.textBox.onkeydown=function(b){
										if(!b){
											b=window.event}
											a.handleKeyDown(b)}
											;this.textBox.onblur=function(){
												a.hideDrop()}
												;this.textBox.onfocus=function(){
													a.handleChange()}
													;this.textBox.focus()}
													;TypeAheadControl.prototype.getPossible=function(b){
														var h=[];var j=0;var f=0;var e=0;var g;var i;b=b.toLowerCase();while(f<=this.maxResults&&j<this.elementList.length){
															var a=false;var c=this.getName(this.elementList[j]);if(c.toLowerCase().indexOf(b)!=-1){
																a=true}
																if(!a&&this.getEntityId(this.elementList[j]).toLowerCase().indexOf(b)!=-1){
																	a=true}
																	if(!a){
																		var d=this.getKeywords(this.elementList[j]);if(null!=d&&d.toLowerCase().indexOf(b)!=-1){
																			a=true}
																		}
																		if(a){
																			h[f]=[c,this.getEntityId(this.elementList[j]),this.geticon(this.elementList[j])];f++}
																			j++}
																			this.dropDown.current=-1;return h}
																			;TypeAheadControl.prototype.handleKeyUp=function(b){
																				var a=b.keyCode;if(27==a){
																					this.textBox.value="";this.handleChange()}
																					else{
																						if(8==a||32==a||(a>=46&&a<112)||a>123){
																							this.handleChange()}
																						}
																					}
																					;TypeAheadControl.prototype.handleKeyDown=function(b){
																						var a=b.keyCode;if(38==a){
																							this.upSelect()}
																							else{
																								if(40==a){
																									this.downSelect()}
																								}
																							}
				;TypeAheadControl.prototype.hideDrop=function(){
				var a=0;if(null!==this.ie6hack){
				while(a<this.ie6hack.length){
				this.ie6hack[a].style.visibility="visible";a++}
			}
				this.dropDown.style.visibility="hidden";if(-1==this.dropDown.current){
				this.doUnselected()}
			}
				;TypeAheadControl.prototype.showDrop=function(){
				var a=0;if(null!==this.ie6hack){
				while(a<this.ie6hack.length){
				this.ie6hack[a].style.visibility="hidden";a++}
			}
				this.dropDown.style.visibility="visible"}
				;TypeAheadControl.prototype.doSelected=function(){
				this.submit.disabled=false}
				;TypeAheadControl.prototype.doUnselected=function(){
				this.submit.disabled=true}
				;TypeAheadControl.prototype.handleChange=function(){
				var b=this.textBox.value;var a=this.getPossible(b);if(0===b.length||0===a.length||(!this.alwaysShow&&this.maxResults<a.length)){
				this.hideDrop();this.doUnselected();this.results=[];this.dropDown.current=-1}
				else{
				this.results=a;this.populateDropDown(a);if(1==a.length){
				this.select(this.dropDown.childNodes[0]);this.doSelected()}
				else{
				this.doUnselected()}
			}
			}
				;TypeAheadControl.prototype.populateDropDown=function(c){
				this.dropDown.innerHTML="";var b=0;var f;var a;var e;while(b<c.length){
				f=document.createElement("div");e=c[b][0];if(null!==c[b][2]){
				a=document.createElement("img");a.src=c[b][2];a.width=16;a.height=16;a.alt="";f.appendChild(a);if(e.length>this.maxchars-2){
				e=e.substring(0,this.maxchars-2)}
				e=" "+e}
				else{
				if(e.length>this.maxchars){
				e=e.substring(0,this.maxchars)}
			}
				f.appendChild(document.createTextNode(e));this.dropDown.appendChild(f);b++}
				var d=this.getXY();this.dropDown.style.left=d[0]+"px";this.dropDown.style.top=d[1]+"px";this.showDrop()}
				;TypeAheadControl.prototype.getXY=function(){
				var a=this.textBox;var c=0;var b=a.offsetHeight;while(a.tagName!="BODY"){
				c+=a.offsetLeft;b+=a.offsetTop;a=a.offsetParent}
				c+=a.offsetLeft;b+=a.offsetTop;return[c,b]}
				;TypeAheadControl.prototype.select=function(b){
				var a=0;var c;this.dropDown.current=-1;this.doUnselected();while(a<this.dropDown.childNodes.length){
				c=this.dropDown.childNodes[a];if(c==b){
				c.className="IdPSelectCurrent";this.doSelected();this.dropDown.current=a;this.origin.value=this.results[a][1];this.origin.textValue=this.results[a][0]}
				else{
				c.className=""}
				a++}
				this.textBox.focus()}
				;
				TypeAheadControl.prototype.downSelect=function(){
				if(this.results.length>0){
				if(-1==this.dropDown.current){
				this.dropDown.current=0;this.dropDown.childNodes[0].className="IdPSelectCurrent";this.doSelected();this.origin.value=this.results[0][1];this.origin.textValue=this.results[0][0]}
				else{
				if(this.dropDown.current<(this.results.length-1)){
				this.dropDown.childNodes[this.dropDown.current].className="";this.dropDown.current++;this.dropDown.childNodes[this.dropDown.current].className="IdPSelectCurrent";this.doSelected();this.origin.value=this.results[this.dropDown.current][1];this.origin.textValue=this.results[this.dropDown.current][0]}
			}
			}
			}
				;TypeAheadControl.prototype.upSelect=function(){
				if((this.results.length>0)&&(this.dropDown.current>0)){
				this.dropDown.childNodes[this.dropDown.current].className="";this.dropDown.current--;this.dropDown.childNodes[this.dropDown.current].className="IdPSelectCurrent";this.doSelected();this.origin.value=this.results[this.dropDown.current][1];this.origin.textValue=this.results[this.dropDown.current][0]}
			}
				;function IdPSelectUI(){
				var n;var N="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var aw;var K;var an;var aa;var Q;var c;var z;var k;var u;var h;var ai;var e;var p;var R;var y;var U;var J;var f;var D;var af;var G;var Y;var aj;var ad;var I;var L;var g;var ak;var M;var ax="idpSelect";var W="IdPSelect";var ae;var x="";var P="";var am=[];var at="entityID";this.draw=function(az){
				if(!j(az)){
				return}
				aw=document.getElementById(az.insertAtDiv);if(!aw){
				H(w("fatal.divMissing"));return}
				if(!d(az.dataSource)){
				return}
				q(az.hiddenIdPs);n.sort(function(aB,aA){
				return aq(aB).localeCompare(aq(aA))}
				);var ay=S();aw.appendChild(ay);ae.draw()}
				;var j=function(ay){
				var aI;y=ay.preferredIdP;U=ay.maxPreferredIdPs;J=ay.helpURL;f=ay.ie6Hack;D=ay.samlIdPCookieTTL;Y=ay.alwaysShow;aj=ay.maxResults;ad=ay.ignoreKeywords;z=ay.defaultLogo;k=ay.defaultLogoWidth;u=ay.defaultLogoHeight;h=ay.minWidth;ai=ay.minHeight;e=ay.maxWidth;p=ay.maxHeight;R=ay.bestRatio;G=ay.maxIdPCharsButton;af=ay.maxIdPCharsDropDown;if(typeof navigator=="undefined"){
				K=ay.defaultLanguage}
				else{
				K=navigator.language||navigator.userLanguage||ay.defaultLanguage}
				if(K.indexOf("-")>0){
				an=K.substring(0,K.indexOf("-"))}
				aa=ay.defaultLanguage;if(typeof ay.langBundles[K]!="undefined"){
				Q=ay.langBundles[K]}
				else{
				if(typeof an!="undefined"&&typeof ay.langBundles[an]!="undefined"){
				Q=ay.langBundles[an]}
			}
				c=ay.langBundles[ay.defaultLanguage];if(!c){
				H("No languages work");return false}
				if(!Q){
				o("No language support for "+K);Q=c}
				if(ay.testGUI){
				return true}
				var aE="urn:oasis:names:tc:SAML:profiles:SSO:idpdiscovery-protocol:single";var aA;var az=false;var aG;var aF;var aC=window;while(null!==aC.parent&&aC!==aC.parent){
				aC=aC.parent}
				var aB=aC.location;var aD=aB.search;if(null==aD||0==aD.length||aD.charAt(0)!="?"){
				if(null==ay.defaultReturn){
				H(w("fatal.noparms"));return false}
				aI=ay.myEntityID;x=ay.defaultReturn;if(null!=ay.defaultReturnIDParam){
				at=ay.defaultReturnIDParam}
			}
				else{
				aD=aD.substring(1);aG=aD.split("&");if(aG.length===0){
				H(w("fatal.noparms"));return false}
				for(aA=0;aA<aG.length;aA++){
				aF=aG[aA].split("=");if(aF.length!=2){
				continue}
				if(aF[0]=="entityID"){
				aI=decodeURIComponent(aF[1])}
				else{
				if(aF[0]=="return"){
				x=decodeURIComponent(aF[1])}
				else{
				if(aF[0]=="returnIDParam"){
				at=decodeURIComponent(aF[1])}
				else{
				if(aF[0]=="policy"){
				aE=decodeURIComponent(aF[1])}
				else{
				if(aF[0]=="isPassive"){
				az=(aF[1].toUpperCase()=="TRUE")}
			}
			}
			}
			}
			}
			}
				if(aE!="urn:oasis:names:tc:SAML:profiles:SSO:idpdiscovery-protocol:single"){
				H(w("fatal.wrongProtocol"));return false}
				if(ay.myEntityID!==null&&ay.myEntityID!=aI){
				H(w("fatal.wrongEntityId")+'"'+aI+'" != "'+ay.myEntityID+'"');return false}
				if(null===x||x.length===0){
				H(w("fatal.noReturnURL"));return false}
				if(!ab(x)){
				H(w("fatal.badProtocol"));return false}
				if(az){
				var aJ=b();if(aJ.length==0){
				location.href=x;return false}
				else{
				var aH=at+"="+encodeURIComponent(aJ[0]);if(x.indexOf("?")==-1){
				aH="?"+aH}
				else{
				aH="&"+aH}
				location.href=x+aH;return false}
			}
				aA=x.indexOf("?");if(aA<0){
				P=x;return true}
				P=x.substring(0,aA);aD=x.substring(aA+1);aG=aD.split("&");for(aA=0;aA<aG.length;aA++){
				aF=aG[aA].split("=");if(aF.length!=2){
				continue}
				aF[1]=decodeURIComponent(aF[1]);am.push(aF)}
				return true}
				;var q=function(aA){
				if(null==aA||0==aA.length){
				return}
				var az;var ay;for(az=0;az<aA.length;az++){
				for(ay=0;ay<n.length;ay++){
				if(v(n[ay])==aA[az]){
				n.splice(ay,1);break}
			}
			}
			}
				;var ab=function(az){
				if(null===az){
				return false}
				var ay="://";var aA=az.indexOf(ay);if(aA<0){
				return false}
				az=az.substring(0,aA);if(az=="http"||az=="https"){
				return true}
				return false}
				;var av=function(){
				if(null==navigator){
				return false}
				var ay=navigator.appName;if(null==ay){
				return false}
				return(ay=="Microsoft Internet Explorer")}
				;var d=function(aB){
				var aA=null;try{
				aA=new XMLHttpRequest()}
				catch(az){
			}
			if(null==aA){
				try{
				aA=new ActiveXObject("Microsoft.XMLHTTP")}
				catch(az){
			}
		}if(null==aA){
				try{
				aA=new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(az){
			}}if(null==aA){
				H(w("fatal.noXMLHttpRequest"));return false}if(av()){
				aB+="?random="+(Math.random()*1000000)}aA.open("GET",aB,false);if(typeof aA.overrideMimeType=="function"){
				aA.overrideMimeType("application/json")}aA.send(null);if(aA.status==200){
				var ay=aA.responseText;if(ay===null){
				H(w("fatal.noData"));return false}n=JSON.parse(ay)}else{
				H(w("fatal.loadFailed")+aB);return false}return true};var T=function(ay){
				for(var az=0;az<n.length;az++){
				if(v(n[az])==ay){
				return n[az]}}return null};var A=function(aD){
				var aC=function(aG){
				var aE=null;var aF;if(null==aD.Logos){
				return null}for(aF in aD.Logos){
				if(aD.Logos[aF].lang==aG&&aD.Logos[aF].width!=null&&aD.Logos[aF].width>=h&&aD.Logos[aF].height!=null&&aD.Logos[aF].height>=ai){
				if(aE===null){
				aE=aD.Logos[aF]}else{
				me=Math.abs(R-Math.log(aD.Logos[aF].width/aD.Logos[aF].height));him=Math.abs(R-Math.log(aE.width/aE.height));if(him>me){
				aE=aD.Logos[aF]}}}}return aE};var aA=null;var az=document.createElement("img");aA=aC(K);if(null===aA&&typeof an!="undefined"){
				aA=aC(an)}if(null===aA){
				aA=aC(null)}if(null===aA){
				aA=aC(aa)}if(null===aA){
				az.src=z;az.width=k;az.height=u;az.alt=w("defaultLogoAlt");return az}az.src=aA.value;az.alt=aq(aD);var ay=aA.width;var aB=aA.height;if(ay>e){
				aB=(e/ay)*aB;ay=e}if(aB>p){
				ay=(p/aB)*ay;ay=p}az.setAttribute("width",ay);az.setAttribute("height",aB);return az};var S=function(){
				var az=ac("IdPSelector");var ay;ay=ao(az);l(az,ay);O(az,ay);return az};var E=function(az,aG){
				var ay=ac(undefined,"PreferredIdPButton");var aF=document.createElement("a");var aE=at+"="+encodeURIComponent(v(az));var aA=x;var aC=A(az);if(aA.indexOf("?")==-1){
				aE="?"+aE}else{
				aE="&"+aE}aF.href=aA+aE;aF.onclick=function(){
				au(v(az))};var aH=ac(undefined,"PreferredIdPImg");aH.appendChild(aC);aF.appendChild(aH);var aD=ac(undefined,"TextDiv");var aB=aq(az);ay.title=aB;if(aB.length>G){
				aB=aB.substring(0,G)+"..."}aD.appendChild(document.createTextNode(aB));aF.appendChild(aD);ay.appendChild(aF);return ay};var ar=function(ay,aB){
				var aA=ac(undefined,"TextDiv");var az=document.createTextNode(w(aB));aA.appendChild(az);ay.appendChild(aA)};var a=function(ay,aA){
				if(null===aA||0===aA.length||"-"==aA.value){
				return}var az=0;while(az<ay.options.length){
				if(ay.options[az].value==aA){
				ay.options[az].selected=true;break}az++}};var ao=function(aC){
				var aB=F();if(0===aB.length){
				return false}var aA=ac("PreferredIdPTile");ar(aA,"idpPreferred.label");for(var az=0;az<U&&az<aB.length;az++){
				if(aB[az]){
				var ay=E(aB[az],az);aA.appendChild(ay)}}aC.appendChild(aA);return true};var V=function(){
				var az=document.createElement("form");L.appendChild(az);az.action=P;az.method="GET";az.setAttribute("autocomplete","OFF");var ay=0;for(ay=0;ay<am.length;ay++){
				var aA=document.createElement("input");aA.setAttribute("type","hidden");aA.name=am[ay][0];aA.value=am[ay][1];az.appendChild(aA)}return az};var l=function(aE,az){
				L=ac("IdPEntryTile");if(az){
				ar(L,"idpEntry.label")}else{
				ar(L,"idpEntry.NoPreferred.label")}var aC=V();var aB=document.createElement("input");aC.appendChild(aB);aB.type="text";i(aB,"Input");var aD=document.createElement("input");aD.setAttribute("type","hidden");aC.appendChild(aD);aD.name=at;aD.value="-";var aA=r("Select");aA.disabled=true;aC.appendChild(aA);aC.onsubmit=function(){
				if(null===aD.value||0===aD.value.length||"-"==aD.value){
				return false}aB.value=aD.textValue;au(aD.value);return true};ae=new TypeAheadControl(n,aB,aD,aA,af,aq,v,X,f,Y,aj,B);var ay=document.createElement("a");ay.appendChild(document.createTextNode(w("idpList.showList")));ay.href="#";Z(ay,"DropDownToggle");ay.onclick=function(){
				L.style.display="none";a(ak,aD.value);g.style.display="inline";M.focus()};L.appendChild(ay);t(L);aE.appendChild(L)};var O=function(aF,aA){
				g=ac("IdPListTile");g.style.display="none";if(aA){
				ar(g,"idpList.label")}else{
				ar(g,"idpList.NoPreferred.label")}ak=document.createElement("select");i(ak,"Selector");ak.name=at;g.appendChild(ak);var az=m("-",w("idpList.defaultOptionLabel"));az.selected=true;ak.appendChild(az);var aE;for(var aC=0;aC<n.length;aC++){
				aE=n[aC];az=m(v(aE),aq(aE));ak.appendChild(az)}var aD=V();aD.appendChild(ak);aD.onsubmit=function(){
				if(ak.selectedIndex<1){
				return false}au(ak.options[ak.selectedIndex].value);return true};var aB=r("List");M=aB;aD.appendChild(aB);g.appendChild(aD);var ay=document.createElement("a");ay.appendChild(document.createTextNode(w("idpList.showSearch")));ay.href="#";Z(ay,"DropDownToggle");ay.onclick=function(){
				L.style.display="inline";g.style.display="none"};g.appendChild(ay);t(g);aF.appendChild(g)};var r=function(az){
				var ay=document.createElement("input");ay.setAttribute("type","submit");ay.value=w("submitButton.label");i(ay,az+"Button");return ay};var t=function(az){
				var ay=document.createElement("a");ay.href=J;ay.appendChild(document.createTextNode(w("helpText")));Z(ay,"HelpButton");az.appendChild(ay)};var ac=function(aA,ay){
				var az=document.createElement("div");if(undefined!==aA){
				i(az,aA)}if(undefined!==ay){
				Z(az,ay)}return az};var m=function(az,aA){
				var ay=document.createElement("option");ay.value=az;if(aA.length>af){
				aA=aA.substring(0,af)}ay.appendChild(document.createTextNode(aA));return ay};var i=function(az,ay){
				az.id=ax+ay};var Z=function(az,ay){az.setAttribute("class",W+ay)};var ap=function(ay){return document.getElementById(ax+ay)};
				var au=function(ay){
					C(ay);
					ag(I)
				};
				var w=function(ay){
					var az=Q[ay];
					if(!az){az=c[ay]}if(!az){
						az="Missing message for "+ay
					}
					return az
				};
				var v=function(ay){
					return ay.entityID
				};
				var X=function(aA){var ay;if(null==aA.Logos){
					return null
				}for(ay=0;ay<aA.Logos.length;ay++){var az=aA.Logos[ay];if(az.height=="16"&&az.width=="16"){if(null==az.lang||K==az.lang||(typeof an!="undefined"&&an==az.lang)||aa==az.lang){return az.value}}}return null};var aq=function(az){var ay=al(az.DisplayNames);if(null!==ay){return ay}o("No Name entry in any language for "+v(az));return v(az)};var B=function(az){if(ad||null==az.Keywords){return null}var ay=al(az.Keywords);return ay};var al=function(ay){var az;for(az in ay){if(ay[az].lang==K){return ay[az].value}}if(typeof an!="undefined"){for(az in ay){if(ay[az].lang==an){return ay[az].value}}}for(az in ay){if(ay[az].lang==null){return ay[az].value}}for(az in ay){if(ay[az].lang==aa){return ay[az].value}}return null};var F=function(){var aB=[];var aA=0;var az;var ay;if(null!=y){for(az=0;az<y.length&&az<U-1;az++){aB[az]=T(y[az]);aA++}}I=b();for(az=aA,ay=0;az<I.length&&az<U;az++,ay++){aB.push(T(I[ay]))}return aB};var C=function(ay){var az=[];while(0!==I.length){var aA=I.pop();if(aA!=ay){az.unshift(aA)}}az.unshift(ay);I=az;return};var b=function(){var aE=[];var aD,aB;var aG;aG=document.cookie.split(";");for(aD=0;aD<aG.length;aD++){var ay=aG[aD];var aC=ay.indexOf("=");var aF=ay.substring(0,aC);var aA=ay.substring(aC+1);if("_saml_idp"==aF.replace(/^\s+|\s+$/g,"")){aA=aA.replace(/^\s+|\s+$/g,"").split("+");for(aB=0;aB<aA.length;aB++){if(0===aA[aB].length){continue}var az=ah(decodeURIComponent(aA[aB]));if(az.length>0){aE.push(az)}}}}return aE};var ag=function(aD){var aA=[];var aC=aD.length;if(aC>5){aC=5}for(var aB=0;aB<aC;aB++){if(aD[aB].length>0){aA.push(encodeURIComponent(s(aD[aB])))}}var ay=null;if(D){var az=new Date();cookieTTL=D*24*60*60*1000;ay=new Date(az.getTime()+cookieTTL)}document.cookie="_saml_idp="+aA.join("+")+"; path = /"+((ay===null)?"":"; expires="+ay.toUTCString())};var s=function(aH){var ay="",aC,aA,az,aG,aF,aE,aD;for(var aB=0;aB<aH.length;){aC=aH.charCodeAt(aB++);aA=aH.charCodeAt(aB++);az=aH.charCodeAt(aB++);aG=aC>>2;aF=((aC&3)<<4)+(aA>>4);aE=((aA&15)<<2)+(az>>6);aD=az&63;if(isNaN(aA)){aE=aD=64}else{if(isNaN(az)){aD=64}}ay+=N.charAt(aG)+N.charAt(aF)+N.charAt(aE)+N.charAt(aD)}return ay};var ah=function(aB){var az="",aI,aG,aE,aH,aF,aD,aC;var aA=0;var ay=/[^A-Za-z0-9\+\/\=]/g;aB=aB.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{aH=N.indexOf(aB.charAt(aA++));aF=N.indexOf(aB.charAt(aA++));aD=N.indexOf(aB.charAt(aA++));aC=N.indexOf(aB.charAt(aA++));aI=(aH<<2)|(aF>>4);aG=((aF&15)<<4)|(aD>>2);aE=((aD&3)<<6)|aC;az=az+String.fromCharCode(aI);if(aD!=64){az=az+String.fromCharCode(aG)}if(aC!=64){az=az+String.fromCharCode(aE)}aI=aG=aE="";aH=aF=aD=aC=""}while(aA<aB.length);return az};var H=function(az){alert("FATAL - DISCO UI:"+az);var ay=document.createTextNode(az);aw.appendChild(ay)};var o=function(){}}(new IdPSelectUI()).draw(new IdPSelectUIParms());























