/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuZWFzaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIGpRdWVyeSBFYXNpbmcgdjEuMyAtIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZy9cclxuICpcclxuICogVXNlcyB0aGUgYnVpbHQgaW4gZWFzaW5nIGNhcGFiaWxpdGllcyBhZGRlZCBJbiBqUXVlcnkgMS4xXHJcbiAqIHRvIG9mZmVyIG11bHRpcGxlIGVhc2luZyBvcHRpb25zXHJcbiAqXHJcbiAqIFRFUk1TIE9GIFVTRSAtIEVBU0lORyBFUVVBVElPTlNcclxuICogXHJcbiAqIE9wZW4gc291cmNlIHVuZGVyIHRoZSBCU0QgTGljZW5zZS4gXHJcbiAqIFxyXG4gKiBDb3B5cmlnaHQgw4PigJrDgsKpIDIwMDEgUm9iZXJ0IFBlbm5lclxyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBURVJNUyBPRiBVU0UgLSBqUXVlcnkgRWFzaW5nXHJcbiAqIFxyXG4gKiBPcGVuIHNvdXJjZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UuIFxyXG4gKiBcclxuICogQ29weXJpZ2h0IMOD4oCaw4LCqSAyMDA4IEdlb3JnZSBNY0dpbmxleSBTbWl0aFxyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLCBcclxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxyXG4gKiBcclxuICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgXHJcbiAqIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cclxuICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3QgXHJcbiAqIG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIFxyXG4gKiBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXHJcbiAqIFxyXG4gKiBOZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBhdXRob3Igbm9yIHRoZSBuYW1lcyBvZiBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBcclxuICogb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cclxuICogXHJcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORCBBTlkgXHJcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRlxyXG4gKiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCxcclxuICogIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURVxyXG4gKiAgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIFxyXG4gKiBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xyXG4gKiAgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgXHJcbiAqIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gXHJcbiAqXHJcbiovXHJcbmpRdWVyeS5lYXNpbmcuanN3aW5nPWpRdWVyeS5lYXNpbmcuc3dpbmc7alF1ZXJ5LmV4dGVuZChqUXVlcnkuZWFzaW5nLHtkZWY6XCJlYXNlT3V0UXVhZFwiLHN3aW5nOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGpRdWVyeS5lYXNpbmdbalF1ZXJ5LmVhc2luZy5kZWZdKGUsZixhLGgsZyl9LGVhc2VJblF1YWQ6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCooZi89ZykqZithfSxlYXNlT3V0UXVhZDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiAtaCooZi89ZykqKGYtMikrYX0sZWFzZUluT3V0UXVhZDpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqZipmK2F9cmV0dXJuIC1oLzIqKCgtLWYpKihmLTIpLTEpK2F9LGVhc2VJbkN1YmljOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGgqKGYvPWcpKmYqZithfSxlYXNlT3V0Q3ViaWM6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCooKGY9Zi9nLTEpKmYqZisxKSthfSxlYXNlSW5PdXRDdWJpYzpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqZipmKmYrYX1yZXR1cm4gaC8yKigoZi09MikqZipmKzIpK2F9LGVhc2VJblF1YXJ0OmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGgqKGYvPWcpKmYqZipmK2F9LGVhc2VPdXRRdWFydDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiAtaCooKGY9Zi9nLTEpKmYqZipmLTEpK2F9LGVhc2VJbk91dFF1YXJ0OmZ1bmN0aW9uKGUsZixhLGgsZyl7aWYoKGYvPWcvMik8MSl7cmV0dXJuIGgvMipmKmYqZipmK2F9cmV0dXJuIC1oLzIqKChmLT0yKSpmKmYqZi0yKSthfSxlYXNlSW5RdWludDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiBoKihmLz1nKSpmKmYqZipmK2F9LGVhc2VPdXRRdWludDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiBoKigoZj1mL2ctMSkqZipmKmYqZisxKSthfSxlYXNlSW5PdXRRdWludDpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqZipmKmYqZipmK2F9cmV0dXJuIGgvMiooKGYtPTIpKmYqZipmKmYrMikrYX0sZWFzZUluU2luZTpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiAtaCpNYXRoLmNvcyhmL2cqKE1hdGguUEkvMikpK2grYX0sZWFzZU91dFNpbmU6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCpNYXRoLnNpbihmL2cqKE1hdGguUEkvMikpK2F9LGVhc2VJbk91dFNpbmU6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gLWgvMiooTWF0aC5jb3MoTWF0aC5QSSpmL2cpLTEpK2F9LGVhc2VJbkV4cG86ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4oZj09MCk/YTpoKk1hdGgucG93KDIsMTAqKGYvZy0xKSkrYX0sZWFzZU91dEV4cG86ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4oZj09Zyk/YStoOmgqKC1NYXRoLnBvdygyLC0xMCpmL2cpKzEpK2F9LGVhc2VJbk91dEV4cG86ZnVuY3Rpb24oZSxmLGEsaCxnKXtpZihmPT0wKXtyZXR1cm4gYX1pZihmPT1nKXtyZXR1cm4gYStofWlmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqTWF0aC5wb3coMiwxMCooZi0xKSkrYX1yZXR1cm4gaC8yKigtTWF0aC5wb3coMiwtMTAqLS1mKSsyKSthfSxlYXNlSW5DaXJjOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIC1oKihNYXRoLnNxcnQoMS0oZi89ZykqZiktMSkrYX0sZWFzZU91dENpcmM6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCpNYXRoLnNxcnQoMS0oZj1mL2ctMSkqZikrYX0sZWFzZUluT3V0Q2lyYzpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiAtaC8yKihNYXRoLnNxcnQoMS1mKmYpLTEpK2F9cmV0dXJuIGgvMiooTWF0aC5zcXJ0KDEtKGYtPTIpKmYpKzEpK2F9LGVhc2VJbkVsYXN0aWM6ZnVuY3Rpb24oZixoLGUsbCxrKXt2YXIgaT0xLjcwMTU4O3ZhciBqPTA7dmFyIGc9bDtpZihoPT0wKXtyZXR1cm4gZX1pZigoaC89ayk9PTEpe3JldHVybiBlK2x9aWYoIWope2o9ayowLjN9aWYoZzxNYXRoLmFicyhsKSl7Zz1sO3ZhciBpPWovNH1lbHNle3ZhciBpPWovKDIqTWF0aC5QSSkqTWF0aC5hc2luKGwvZyl9cmV0dXJuIC0oZypNYXRoLnBvdygyLDEwKihoLT0xKSkqTWF0aC5zaW4oKGgqay1pKSooMipNYXRoLlBJKS9qKSkrZX0sZWFzZU91dEVsYXN0aWM6ZnVuY3Rpb24oZixoLGUsbCxrKXt2YXIgaT0xLjcwMTU4O3ZhciBqPTA7dmFyIGc9bDtpZihoPT0wKXtyZXR1cm4gZX1pZigoaC89ayk9PTEpe3JldHVybiBlK2x9aWYoIWope2o9ayowLjN9aWYoZzxNYXRoLmFicyhsKSl7Zz1sO3ZhciBpPWovNH1lbHNle3ZhciBpPWovKDIqTWF0aC5QSSkqTWF0aC5hc2luKGwvZyl9cmV0dXJuIGcqTWF0aC5wb3coMiwtMTAqaCkqTWF0aC5zaW4oKGgqay1pKSooMipNYXRoLlBJKS9qKStsK2V9LGVhc2VJbk91dEVsYXN0aWM6ZnVuY3Rpb24oZixoLGUsbCxrKXt2YXIgaT0xLjcwMTU4O3ZhciBqPTA7dmFyIGc9bDtpZihoPT0wKXtyZXR1cm4gZX1pZigoaC89ay8yKT09Mil7cmV0dXJuIGUrbH1pZighail7aj1rKigwLjMqMS41KX1pZihnPE1hdGguYWJzKGwpKXtnPWw7dmFyIGk9ai80fWVsc2V7dmFyIGk9ai8oMipNYXRoLlBJKSpNYXRoLmFzaW4obC9nKX1pZihoPDEpe3JldHVybiAtMC41KihnKk1hdGgucG93KDIsMTAqKGgtPTEpKSpNYXRoLnNpbigoaCprLWkpKigyKk1hdGguUEkpL2opKStlfXJldHVybiBnKk1hdGgucG93KDIsLTEwKihoLT0xKSkqTWF0aC5zaW4oKGgqay1pKSooMipNYXRoLlBJKS9qKSowLjUrbCtlfSxlYXNlSW5CYWNrOmZ1bmN0aW9uKGUsZixhLGksaCxnKXtpZihnPT11bmRlZmluZWQpe2c9MS43MDE1OH1yZXR1cm4gaSooZi89aCkqZiooKGcrMSkqZi1nKSthfSxlYXNlT3V0QmFjazpmdW5jdGlvbihlLGYsYSxpLGgsZyl7aWYoZz09dW5kZWZpbmVkKXtnPTEuNzAxNTh9cmV0dXJuIGkqKChmPWYvaC0xKSpmKigoZysxKSpmK2cpKzEpK2F9LGVhc2VJbk91dEJhY2s6ZnVuY3Rpb24oZSxmLGEsaSxoLGcpe2lmKGc9PXVuZGVmaW5lZCl7Zz0xLjcwMTU4fWlmKChmLz1oLzIpPDEpe3JldHVybiBpLzIqKGYqZiooKChnKj0oMS41MjUpKSsxKSpmLWcpKSthfXJldHVybiBpLzIqKChmLT0yKSpmKigoKGcqPSgxLjUyNSkpKzEpKmYrZykrMikrYX0sZWFzZUluQm91bmNlOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGgtalF1ZXJ5LmVhc2luZy5lYXNlT3V0Qm91bmNlKGUsZy1mLDAsaCxnKSthfSxlYXNlT3V0Qm91bmNlOmZ1bmN0aW9uKGUsZixhLGgsZyl7aWYoKGYvPWcpPCgxLzIuNzUpKXtyZXR1cm4gaCooNy41NjI1KmYqZikrYX1lbHNle2lmKGY8KDIvMi43NSkpe3JldHVybiBoKig3LjU2MjUqKGYtPSgxLjUvMi43NSkpKmYrMC43NSkrYX1lbHNle2lmKGY8KDIuNS8yLjc1KSl7cmV0dXJuIGgqKDcuNTYyNSooZi09KDIuMjUvMi43NSkpKmYrMC45Mzc1KSthfWVsc2V7cmV0dXJuIGgqKDcuNTYyNSooZi09KDIuNjI1LzIuNzUpKSpmKzAuOTg0Mzc1KSthfX19fSxlYXNlSW5PdXRCb3VuY2U6ZnVuY3Rpb24oZSxmLGEsaCxnKXtpZihmPGcvMil7cmV0dXJuIGpRdWVyeS5lYXNpbmcuZWFzZUluQm91bmNlKGUsZioyLDAsaCxnKSowLjUrYX1yZXR1cm4galF1ZXJ5LmVhc2luZy5lYXNlT3V0Qm91bmNlKGUsZioyLWcsMCxoLGcpKjAuNStoKjAuNSthfX0pOyJdLCJmaWxlIjoianF1ZXJ5LmVhc2luZy5qcyJ9