import { FlatList, View, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";

import Text from "./Text";
import theme from "../theme";
import useUsuarioActual from "../hooks/useUsuarioActual";
import useEliminarReseña from "../hooks/useEliminarReseña";

const estilos = StyleSheet.create({
  separador: {
    height: 10,
    backgroundColor: theme.colors.colorDeFondo,
  },
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  containerDeReseña: {
    flexDirection: "row",
  },
  containerDeCalificacion: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textoCalificacion: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  contenidoReseña: {
    flex: 1,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  botonVer: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  botonEliminar: {
    backgroundColor: theme.colors.error,
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
  },
});

const ReseñaItem = ({ reseña, onVerRepositorio, onEliminar }) => {
  return (
    <View style={estilos.container}>
      <View style={estilos.containerDeReseña}>
        <View style={estilos.containerDeCalificacion}>
          <Text style={estilos.textoCalificacion}>{reseña.rating}</Text>
        </View>

        <View style={estilos.contenidoReseña}>
          <Text fontWeight="bold">{reseña.repository.fullName}</Text>

          <Text color="textSecondary">
            {format(new Date(reseña.createdAt), "dd.MM.yyyy")}
          </Text>

          <Text>{reseña.text}</Text>
        </View>
      </View>
      
      <View style={estilos.botones}>
        <Pressable style={estilos.botonVer} onPress={onVerRepositorio}>
          <Text style={estilos.textoBoton}>View repository</Text>
        </Pressable>

        <Pressable style={estilos.botonEliminar} onPress={onEliminar}>
          <Text style={estilos.textoBoton}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SeparadorDeLista = () => <View style={estilos.separador} />;

const MisReseñas = () => {
  const navigate = useNavigate();
  // Se llama al hook con "true" para obtener las reseñas.
  const { usuario, loading, error, refetch } = useUsuarioActual(true);
  const [eliminarReseña] = useEliminarReseña();

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar las reseñas: {error.message}</Text>;
  if (!usuario) return null;

  const reseñas = usuario.reviews.edges.map((edge) => edge.node);

  const confirmarEliminacion = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "CANCEL", style: "cancel" },
        {
          text: "DELETE",
          // "style" es exclusivo de iOS (no android, pero es buena práctica) y permite definir el rol del botón (cancel, destructive, default). Acá se usa "destructive" para que el sistema aplique el diseño visual de advertencia adecuado para una eliminación.
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarReseña(id);
              // Actualización de la lista después de borrar.
              await refetch();
            } catch (error) {
              console.log("Error al eliminar: ", error);
            }
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reseñas}
      renderItem={({ item }) => (
        <ReseñaItem
          reseña={item}
          // Al presionar la reseña, navega hacia la vista detallada del repositorio correspondiente.
          onVerRepositorio={() =>
            navigate(`/repositorio/${item.repository.id}`)
          }
          onEliminar={() => confirmarEliminacion(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={SeparadorDeLista}
    />
  );
};

export default MisReseñas;
