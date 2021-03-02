
/* Fetch from API endpoint */
async function getUsers()  
{
   
    try {
        let res = await fetch('https://literate-tribble.vrmn17v8c56d2.us-west-2.cs.amazonlightsail.com/persons');
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


/* To Add SeeMore button */
function myFunction(x) 
{
  var moreText = document.getElementById("more_" + x);
 
  var btnText = document.getElementById("button_" + x);
  if (moreText.style.display == "none") {
    btnText.style.display = "none";
    moreText.style.display = "inline";
  } 
}


/* Render Each User into HTML page */
async function renderUsers() {
   var users = await getUsers();
   var html = '';         
   users.forEach(user => {
          let tags = '';
        
          // Appending tag Data from metadata
          for(let i=0;i<user.metadata.tags.length;i++) {
            tags+='<span class="u-tags">' + user.metadata.tags[i] + '</span> &nbsp;';
          }

          var str = user.biography;
          var count = 0;          
          var str2='';
          
          // To find all '/n' and also add seemore button
          for( let i=0;;i++)                       
          {
              var pos = str.indexOf("\n");
              if(pos == -1) {
                break;
              }
                count++;
                var str = str.replace("\n", "<br>");
                
                if(count == 1) {
                  str2= str2 + str.substring(pos+4);  
                  str = str.substring(0,pos+4);  
                  str = str + '<span style="display:none" id="more_' + user.id + '">' + str2 + '</span>';     
                  str = str + '<a style="color:blue;" onclick="myFunction(' + user.id + ')" id="button_' + user.id + '">' + 'Read more</a>'
                  break;
                } 
          }        
          
          // Appending Data of each User
          html+= '<section class="u-image"  style=background-image:url(\"images/'+ user.id +'.jpg\");>' +
                   '<div class="u-sheet">' +
                      '<h2 class="u-text-1">' + user.name + '</h2>' + '<br>' +'<date style=color:#ff99ce>' + user.date_of_birth + '</date>' + '<br>' +
                          '<h3 class="u-text-2" >BIOGRAPHY</h3>' +
                              '<p class="u-text-3">' + str + '</p><br><br>' +
                              '<p >' + tags + '</p>' +
                   '</div>' +
                  '</section>';
    });
    var container = document.querySelector('.container');
 
    container.innerHTML = html;
}

renderUsers();
