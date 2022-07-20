import { useState } from 'react';
import { VStack } from 'native-base';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore'

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
    const [loading, setLoading] = useState(false)
    const [patrimony, setPatrimony] = useState('')
    const [description, setDescription] = useState('')

    const navigation = useNavigation()

    function handleNerOrderRegister() {
        if (!patrimony || !description) {
            return Alert.alert('Registrar', 'Preencha todos os campos.')
        }

        setLoading(true)

        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
                navigation.goBack()
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                return Alert.alert('Registrar', 'Ocorreu um erro ao registrar.')
            })
    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Solicitação" />

            <Input 
                placeholder='Número do patrimônio'
                mt={4}
                textAlignVertical='top'
                onChangeText={setPatrimony}
            />

            <Input 
                placeholder='Descrição do problema'
                flex={1}
                mt={5}
                multiline
                textAlignVertical='top'
                onChangeText={setDescription}
            />

            <Button 
                title='Cadastrar'
                mt={5}
                isLoading={loading}
                onPress={handleNerOrderRegister}
            />
        </VStack>
    );
}