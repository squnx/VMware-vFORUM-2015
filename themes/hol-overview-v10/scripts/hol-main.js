/*

   HOL-MAIN.JS - CORE FUNCTIONS TO SET UP HOL COMMUNITY OVERVIEW PAGE.
   

*/

(function($){


// init function is called from Jive html widget once data has been declared

var initPage = function(Carousel,Labs,LabText,DocText,CommunityText){
   
   buildHeroCarousel(Carousel);
   buildLabsCarousel(Labs);
   buildLinkBoxes(LabText,DocText,CommunityText);
   
   if( window.pageLoaded === undefined )
      $(".j-layout, #j-main").addClass("hol-inactive");
   
   window.pageLoaded = true;
   
   // show page
   $(".page-content").css("visibility","visible");
   
   $(".product-video-cover").on("click", showVideoPlayer);
   
   $("#jive-place-link-manage-tab").on("click",function(){
      $(".j-layout, #j-main").removeClass("hol-inactive").off("click");
   });
   
};

// replace text link boxes

var buildLinkBoxes = function(LabText,DocText,CommunityText){
   
  LabText !== "" ? $(".hol-box-2 .hol-box-info .hol-box-subtitle").text(LabText) : null; 
  DocText !== "" ? $(".hol-box-3 .hol-box-info .hol-box-subtitle").text(DocText) : null; 
  CommunityText !== "" ? $(".hol-box-4 .hol-box-info .hol-box-subtitle").text(CommunityText) : null; 
   
};


// create Hero carousel

var buildHeroCarousel = function(Carousel){
    
   var innerHTML="",
       indicators="";
   
   for(var i=0; i < Carousel.length; i++){
      innerHTML += i==0 ? '<div class="item active">' : '<div class="item">';
      innerHTML +=   '<div class="hol-carousel-image" style="background-image:url(\''+Carousel[i].imgSRC+'\');"></div> \
                      <div class="carousel-caption"> \
                        <h2 class="carousel-item-header">'+Carousel[i].header+'</h2>';
            
      innerHTML += Carousel[i].message ? '<p class="carousel-item-message">'+Carousel[i].message+'</p>' : '';
      innerHTML += (Carousel[i].linkURL && Carousel[i].linkText) ? '<a target="_top" alt="'+Carousel[i].linkText+'" title="'+Carousel[i].linkText+'" href="'+Carousel[i].linkURL+'" class="carousel-item-link">'+Carousel[i].linkText+' <span class="glyphicon glyphicon-chevron-right"></span></a>' : '';
      innerHTML += '</div></div>';
      
      indicators += i==0 ? '<li data-target="#carousel-hero" data-slide-to="'+i+'" class="active"></li>' : '<li data-target="#carousel-hero" data-slide-to="'+i+'" class=""></li>';
      
   };
     
   $("#carousel-hero .carousel-inner").empty().append(innerHTML);
   $("#carousel-hero .carousel-indicators").empty().append(indicators);
   $("#carousel-hero").carousel({interval: 5000});
};


// create featured lab carousel

var buildLabsCarousel = function(Labs){
    
   var innerHTML="",
       indicators="";
   
   for(var i=0; i < Carousel.length; i++){
      innerHTML += i==0 ? '<div class="item row active">' : '<div class="item row">';
      innerHTML +=   '<div class="col-xs-12" style="padding-bottom:10px;"> \
                        <div class="hol-carousel-title col-xs-12 col-sm-9">'+Labs[i].title+'</div> \
                        <div class="hol-labs-icon col-xs-12 col-sm-3" style="background-image:url(\''+Labs[i].icon+'\');"></div> \
                      </div> \
                        <div class="carousel-caption clearfix"> \
                           <div class="content col-xs-12 col-sm-8">'+Labs[i].overview+'</div> \
                           <div class="actions col-xs-12 col-sm-4"> \
                              <a target="_top" alt="'+Labs[i].title+'" title="'+Labs[i].title+'"href="'+Labs[i].launchUrl+'"> \
                                 <div class="hol-launch-lab"><span class="glyphicon glyphicon-cloud-upload"></span> Launch</div> \
                              </a> \
                              <a target="_top" alt="'+Labs[i].title+'" title="'+Labs[i].title+'"href="'+Labs[i].docsUrl+'"> \
                                 <div class="hol-lab-details"><span class="glyphicon glyphicon-th-list"></span> Details <span class="glyphicon glyphicon-chevron-right"></span></div> \
                              </a> \
                           </div> \
                        </div></div>';
      
      indicators += i==0 ? '<li data-target="#carousel-labs" data-slide-to="'+i+'" class="active"></li>' : '<li data-target="#carousel-labs" data-slide-to="'+i+'" class=""></li>';
      
   };
     
   $("#carousel-labs .carousel-inner").empty().append(innerHTML);
   $("#carousel-labs .carousel-indicators").empty().append(indicators);
   $("#carousel-labs").carousel("pause");
   var labsTimer = null;
   $("#carousel-labs").on("mouseenter",function(){
      $("#carousel-labs").carousel("pause");
      if(labsTimer !== null){
         clearInterval(labsTimer);
         labsTimer = null;
      }
   }).on("mouseleave",function(){
      $("#carousel-labs").carousel("pause");
      if(labsTimer === null)
         labsTimer = setInterval(function(){
            $("#carousel-labs").carousel("prev");
         },5000);
   });
   labsTimer = setInterval(function(){
            $("#carousel-labs").carousel("prev");
         },5000);
};




var showVideoPlayer = function(e){
   
   var target = $(e.currentTarget);
   
   target.replaceWith('<iframe width="'+target.outerWidth()+'" height="'+target.height()+'" src="//www.youtube.com/embed/xk9716huKG4?theme=light&autoplay=1" frameborder="0" allowfullscreen></iframe>');
}

window.initPage = initPage;


})(_JQ);