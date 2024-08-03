import React,{useState} from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-elements';
import { string } from 'yup';


// import { 
//     CheckBox 
// } from 'react-native-elements';


const GeneratePassword = () => {
    const [passwordLength,setPassWordLength] = useState('')
    const [passWordString,setPassWordString] = useState('')
    const [errorMsg,setErrorMsg] = useState('')
    const [validPassWord,setIsValidPassword] = useState(false)
    const [lowerCase,setLowerCase] = useState(false)
    const [uppercase,setUpperCase] = useState(false)
    const [number,setNumber] = useState(false)
    const [symbol,setSymbol] = useState(false)

    const generatePasswordString = (passwordLength:number) => {
        let passwordString = "";
        let uppercaseString = 'ABCDEFGGHJKLMNPQRSTUVWXYZ'
        let lowercaseString = 'abcdefghijklmnopqrstuvwxyz'
        let numbersString = '0123456789'
        let symbolsString = '!@#$%^&'

        if(lowerCase){
            passwordString += lowercaseString
        }

        if(uppercase){
            passwordString += uppercaseString
        }

        if(number){
            passwordString += numbersString
        }

        if(symbol){
            passwordString += symbolsString
        }

        const pass = generatedPass(passwordLength,passwordString)

        setPassWordString(pass)
    }

    const generatedPass = (passwordLength:number,passWordString:string) => {
        let pass = ""
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * passWordString.length);
            pass += passWordString.charAt(randomIndex);
        }
        return pass
    }

    const validatePassword = (passwordLength: number) =>{
        let isValid = true;  
        let errorMsg = ""

        if(passwordLength == 0){
            errorMsg = "password length is mandatory"
            isValid = false;
        }else if(passwordLength < 4){
            errorMsg = "Min password must be at least 4 characters"
            isValid = false;
        }else if(passwordLength > 8){
            errorMsg = "Max password must be at least 8 characters"
            isValid = false;
        }

        if(!uppercase && !lowerCase && !number && !symbol){
            errorMsg = "Please select any checkbox"
            isValid = false;
        }

        if(isValid) {
            generatePasswordString(+passwordLength)
            setErrorMsg('')
            setIsValidPassword(true)
        }else{
            setErrorMsg(errorMsg)
        }
    }

    const resetPassword = () => {
        setPassWordLength("");
        setLowerCase(false);
        setUpperCase(false);
        setNumber(false);
        setSymbol(false);
        setErrorMsg('');
        setIsValidPassword(false); 
    }

    return (
        <View>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Password Generator</Text>
                </View>
                <View style={styles.validationContainer}>
                    <View style={styles.optionsContainer}>
                        <Text style={styles.label}>Password Length</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder='ex.4'
                            value={passwordLength}
                            onChangeText={(e)=>{setPassWordLength(e),setErrorMsg("")}}
                        />
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.label}>Lower Case</Text>
                    <CheckBox
                        value={lowerCase}
                        onValueChange={(prev)=>setLowerCase((prev)=>!prev)}
                    />
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.label}>Upper Case</Text>
                    <CheckBox
                        value={uppercase}
                        onValueChange={(prev)=>setUpperCase((prev)=>!prev)}
                    />
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.label}>Number Case</Text>
                    <CheckBox
                        value={number}
                        onValueChange={(prev)=>setNumber((prev)=>!prev)}
                    />
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.label}>Symbol Case</Text>
                    <CheckBox
                        value={symbol}
                        onValueChange={(prev)=>setSymbol((prev)=>!prev)}
                    />
                </View>
                <Text style={[styles.errorMsg,styles.label]}>{errorMsg}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.generateButton} onPress={()=>validatePassword(+passwordLength)}>
                        <Text style={{color:'white',textAlign:'center'}}>Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton} onPress={resetPassword}>
                        <Text style={{textAlign:'center'}}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.passWordStringContainer}>
                    {
                        (passWordString != "" && validPassWord) &&
                            <View style={styles.passWordCard}>
                                <Text selectable>{passWordString}</Text>
                            </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight:'bold'
    },
    errorMsg:{
        fontSize: 12,
        color: 'red',
    },
    passWordStringContainer:{
        flexDirection: 'row',
        flex:1,
        padding:48,
        paddingTop:10,
        alignItems: 'center',
        justifyContent:'center',
        marginVertical: 8,
    },

    passWordCard:{
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,  // Correcting the borderColor issue
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Adding shadow offset
        shadowOpacity: 0.8, // Adding shadow opacity
        shadowRadius: 2, // Adding shadow radius
        elevation: 5, // Adding elevation for Android shadow
        borderRadius: 5,
        flex: 1,
        width: '70%',
        padding: 28,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8, // Rounded corners
        paddingHorizontal: 16, // Horizontal padding
        paddingVertical: 8, // Vertical padding
        width: '40%', // Adjust width as needed
        backgroundColor: 'white',
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.2, // For iOS shadow
        shadowRadius: 2, // For iOS shadow
        margin:5
    },
    validationContainer:{
        flex: 1,
        alignItems: 'flex-start',
    },
    headerContainer:{
        flex:1,
        padding:5
    },
    generateButton:{
        backgroundColor: "#5294ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin:10,
        color: "#ffffff",
        width:'40%',
        borderRadius: 8,
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    },
    resetButton:{
        width:'40%',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin:10,
        borderRadius: 8,
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.2, // For iOS shadow
        shadowRadius: 2, // For iOS shadow
    },
    optionsContainer:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonContainer:{
        flexDirection: 'row',
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        marginVertical: 8,
    },
    checkbox: {
        flexDirection: 'row',
        width:'100%',
        flex:1,
        alignItems:'flex-end',
    },
    label: {
        margin: 8,
        fontSize:15,
        width:'90%',
        flex:1,
    },
})

export default GeneratePassword;
