import *as  React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground ,TextInput} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';


export default class HomeScreen extends React.Component
{
    constructor()
    {
        super();
        this.state={
            text:"",
            isSearchPressed: false,
            word: "",
            lexicalCategory: "",
            examples: [],
            definition:"",
        }
    }

    getWord=(word)=>
    {
       
        var url="https://api.dictionaryapi.dev/api/v2/entries/en_US/"+word.toLowerCase();
        
         return fetch(url).then(response => response.json()).then(responseJson=>{
         
         
          console.log(responseJson[0])

                var responseObject=responseJson[0]
                var word=responseObject.word;
                var lexicalCategory=responseObject.meanings[0].partOfSpeech;
                var definition=responseObject.meanings[0].definitions[0].definition

                this.setState(
                  {
                    "word": word.trim(),
                    "lexicalCategory": lexicalCategory=== undefined ? "": lexicalCategory.trim(),
                    "definition": definition=== undefined ? "": definition.trim()

                  }
                );
            }
            ).catch(error=>{console.log("Error "+error);})
  }



    
  render()
  {
    return(
      <ImageBackground source={require("./assets/books.jpeg")} style={styles.image}>
      
      <SafeAreaProvider> 
      <View style={styles.container}>
      <Header centerComponent={{text:"Pocket Dictionary", style:[styles.text,{height:46,fontSize:25,color:"black",fontStyle:"bold",textAlign:"center",alignContent:"center"}] }}  backgroundColor="#C5FF60" />
   </View>
      <TextInput
      style={styles.input}
      onChangeText={text=>
            {
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading...",
                    lexicalCategory:"",
                    examples: [],
                    definition: "" ,               
                }
                )
            }
            }

            value={this.state.text}>
      
      </TextInput>

      <TouchableOpacity style={styles.search} onPress={()=>{
       
          this.setState({isSearchPressed:true});

          this.getWord(this.state.text);
      }
       }>
          <Text style={{color:"#E8FFFF", fontFamily:'Inter_900Black', fontWeight:"bold",fontSize:35}}>Search</Text>

      </TouchableOpacity>
  

      <View style={styles.details}>
        <Text style={styles.detailsTitle}>
          Word: {" "}
        </Text>
        <Text style={styles.text}>
          {this.state.word}{""}
        </Text>
        </View>

        <View style={styles.details}>
        <Text style={styles.detailsTitle}>
          Type: {" "}
        </Text>
        <Text style={styles.text}>
          {this.state.lexicalCategory}{""}
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailsTitle}>
          Definition: {" "}
        </Text>
        <Text style={styles.text}>
          {this.state.definition}{""}
        </Text>
      </View>
 
   
      </SafeAreaProvider>
          </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor:"",
  },
  text:
  {
    fontSize:33,
    fontFamily:"Inter_900Black",
    fontStyle:"italic",
    marginRight:12,
    textAlign:"center" ,
    justifyContent:"center",
    alignItems:"center",
  },
  details:
  {
   flexDirection: "row", 
   flexWrap:"wrap",
   alignContent:"center",
   justifyContent:"center",
  },
  detailsTitle:
  {
     fontSize:30,
    fontFamily:"Inter_900Black",
    fontWeight:"bold",
    marginRight:12,
    textAlign:"center" 
  },
  search:
  {
    height: 35,
    width:"50%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3EBDFF',
    color:"white",
    marginTop:10,  
    marginLeft:"25%",
    marginBottom:30,
    borderRadius: 7,
  },
  image:
  {
    height:"100%",
    width:"100%",
  },
  input:
  {
    borderWidth:5,
    marginLeft:"43%",
    borderRadius: 10,
    alignItems:"center",
    alignContent:"center",
    color:"#3EBDFF",
    fontFamily:"Itim",
    textAlign:"center",
    fontSize:55,
    marginTop:50,
    width:200,
    height:60,
   justifyContent:"center",
  }
});
 
