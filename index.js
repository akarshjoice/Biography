
/* Fetching from API endpoint */
async function getUsers()  
{
   
    try {
        let res = await fetch('https://literate-tribble.vrmn17v8c56d2.us-west-2.cs.amazonlightsail.com/persons');
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


/* Add ReadMore button */
function myFunction(x) 
{
  var moreText = document.getElementById("more_" + x);
 
  var btnText = document.getElementById("button_" + x);
  if (moreText.style.display == "none") {
    btnText.style.display = "none";
    moreText.style.display = "inline";
  } 
}


/* Render Each User and add each to HTML page */
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
          
          // Find all '/n' and replace them with <br> and also add ReadMore button after one newline '\n' (can be extended to add after two newlines)
          for( let i=0;;i++)                       
          {
              var pos = str.indexOf("\n");
              if(pos == -1) {
                break;
              }
                count++;
                var str = str.replace("\n", "<br>");
                
                if(count == 1) {
                  str = str.replace(/\n/g, "<br>");
                  str2= str2 + str.substring(pos+4);  
                  str = str.substring(0,pos+4);  
                  str = str + '<span style="display:none" id="more_' + user.id + '">' + str2 + '</span>';     
                  str = str + '<a style="color:blue;" onclick="myFunction(' + user.id + ')" id="button_' + user.id + '">' + 'Read more</a>'
                  break;
                } 
          }        
          
          // Appending Data of each User
          html+= '<section class="u-image u-section-1"  style=background-image:url(\"images/'+ user.id +'.jpg\");>' +
                   '<div class="u-sheet u-valign-bottom u-sheet-1">' +
                      '<h2 class="u-text u-text-1">' + user.name + '</h2>' + '<br>' +'<date style=color:#ff99ce>' + user.date_of_birth + '</date>' + '<br>' +
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