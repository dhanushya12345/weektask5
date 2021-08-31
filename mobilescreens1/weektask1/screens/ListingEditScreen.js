import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image,TouchableWithoutFeedback,Modal,FlatList} from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../app/colors/Config';
import defaultStyles from '../app/colors/DefaultStyles';
import AppText from '../components/AppText';
import TextInputs from '../components/TextInput';
import AppButton from '../components/AppButton';
import {Formik } from 'formik';
import * as yup from 'yup';
import ErrorScreen from '../components/ErrorScreen';
import ListingItems from '../components/ListingItems';
import AppPicker from '../components/AppPicker';

const validationSchema  = yup.object().shape({
  title : yup.string().required().min(1).label('Title'),
  price : yup.number().min(1).max(1000).label('Price'),
  description : yup.string().optional().label('Description')
});

const Products = [
  {
    id: 1,
    title: 'Table'
    
  },
  {
    id:2,
    title: 'Chair',
    
  },
  {
    id:3,
    title: 'Couch',
   
  },
  {
    id:4,
    title: 'Beenbag',
    
  },
  {
    id:5,
    title: 'Sofa',
   
  },
];



const ListingEditScreen=({icon})=> {

const [modal, setmodal] = useState(false);
const [product,setprouct]=useState(Products);

const [category, setCategory]=useState('Category');

 

const handleClick = (item) =>{
          setCategory(item.title);
          console.log("you have pressed the "+item.title);
        }
                             


  return(
  <View style={styles.container}>
  
  <Formik 
        initialValues={{title:'',price:''}}
        onSubmit={(values)=>console.log(values)}
      validationSchema={validationSchema}
  >
    {({handleChange,handleSubmit,errors,touched,setFieldTouched})=>(
      <>
                <TextInputs
                 placeholder='TITLA' 
                // onChangeText={(text)=>setemail(text)}
                onChangeText={handleChange('title')}
                onBlur={() => setFieldTouched("title")}
                />
                {/* <AppText >{errors.title}</AppText> */}
                 {touched.title && <ErrorScreen error={errors.title}></ErrorScreen>} 
              
                <TextInputs
                  placeholder='PRICE' keyboardType="numeric" 
                    // onChangeText={(text)=>setpassword(text)}
                    onChangeText={handleChange('price')}
                    onBlur={() => setFieldTouched("price")}
                    />

              {touched.price && <ErrorScreen error={errors.price}></ErrorScreen>} 



<AppPicker category={category} data={product}   keyExtractor={(Products) => Products.id.toString()}  renderItem={({item})=>(<ListingItems title={item.title}  onPress={()=>handleClick(item)}></ListingItems>)}/>

              <TextInputs
                  placeholder='DESCRIPTION' keyboardType="default"
                    // onChangeText={(text)=>setpassword(text)}
                    onChangeText={handleChange('description')}
                    onBlur={() => setFieldTouched("description")}
                    />
                {touched.description && <ErrorScreen error={errors.description}></ErrorScreen>} 

                <AppButton title="POST" color={color.primary}
                  // myPress={()=>console.log(email,password)} 
                  myPress={handleSubmit}
                   />
      </>
    )} 
   </Formik>
  </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    justifyContent:'flex-start',
    marginTop:'-20%',
    alignItems:'center',
    marginVertical:10,
    backgroundColor:defaultStyles.colors.light
   
  },
  container1:{

    width:"95%",
    flexDirection:'row',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    alignItems:'center',
    borderWidth:1,
    borderRadius:25,
    height:44,
    marginVertical:10,
    backgroundColor:'#f8f4f4',
  }
});


export default ListingEditScreen;





