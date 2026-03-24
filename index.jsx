import { useState, useEffect} from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState("");

  
  

  useEffect(()=> {
    async function carregarTarefas(){
    const tarefas = await AsyncStorage.getItem("@tarefas");
    if (tarefas) {
console.log ("carregando Tarefas...")
setTarefas(JSON.parse(tarefas))
    }
  
}

    carregarTarefas()
  }, []);

  useEffect(() => {
    async function salvandoTarefas(){
    if (tarefas) {
    await AsyncStorage.setItem("@tarefas", JSON.stringify(tarefas));
console.log ("salvando Tarefas...")
    }
  
}
  salvandoTarefas()
  }, [tarefas]);


  function addTarefa(tarefa) {
    const objeto = {
      tarefa: tarefa,
      isConcluido: false
    }

    setTarefa("")
    setTarefas([...tarefas, objeto])
  }

  function toggieConcluido( posicao){
    const novaLista = tarefas.map(({tarefa, isConcluido}, indice) => {
      return {
        tarefa: tarefa,
        isConcluido: posicao === indice ? !isConcluido : isConcluido
      }
    }
    )

    setTarefas(novaLista)

  }

  function removerTarefa(posicao){
const novaLista = tarefas.filter((_, indice) => posicao !== indice)
 setTarefas(novaLista)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Titulo</Text>
      <Text style={styles.subTitulo}>Subtitulo</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Digite a tarefa..."
          value={tarefa}
          onChangeText={setTarefa}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => addTarefa(tarefa)}
        >
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: "100%"}}>
        {tarefas.map(( {tarefa, isConcluido}, indice) => (
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}onPress={() => toggieConcluido(indice)}>
              {isConcluido? <FontAwesome name="check" size={24} color="black" />:<Foundation name="x" size={24} color="black" />}
            
            </TouchableOpacity>

            <TextInput editable= {false} value={tarefa} style={styles.tarefaTexto} />

            <TouchableOpacity style={styles.button} onPress={() => removerTarefa(indice)}>
              <FontAwesome name="trash-o" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: "#f0f0ff"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f0f0f"
  },
  subTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f0f0f",
    marginBottom: 16,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 14,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "gray",
    width: "100%"
  },
  button: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "blue",
  },
  tarefaTexto: {
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    color: "#e2ecff",
    width: "100%",
    paddingHorizontal: 8
  }
})
