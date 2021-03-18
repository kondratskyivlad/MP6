import React from 'react';
import {StyleSheet, View, Dimensions,
    Image, Text,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
import MoviesList from '../MoviesList.json'
import {Card} from 'react-native-elements'
import { getImage } from '../constants/data'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Appbar} from 'react-native-paper';
import SearchBar from "react-native-dynamic-search-bar";

const portrait_styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "center",
    },
    CardContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
    },
    ViewContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        width: 250,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        marginBottom: 10,
    },
    TextContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    description: {
        fontSize: 20,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    img: {
        height: 250,
        width: 165,
        borderRadius: 20,
        marginBottom: 10,
    },
});

const landscape_styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: 'space-around'
    },
    CardContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
    },
    ViewContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        width: 250,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        marginBottom: 10,
    },
    TextContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    description: {
        fontSize: 20,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    img: {
        height: 250,
        width: 150,
        marginBottom: 10,
    },
});

const orientation = () => {
    const dim = Dimensions.get('screen');
    if (dim.height >= dim.width) {
        return portrait_styles
    } else {
        return landscape_styles
    }
}

const MyTheme = {
    dark: false,
    colors: {
        primary: '#beae8d',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

// imageContainerStyle={
//     image.idx === 0 ?
//         {
//             width: dim.width / 4,
//             height: dim.height / 6.5,
//         } :
//         {
//             width: dim.width / 4,
//             height: dim.height / 6.5,
//         }
// }

let data = [];

MoviesList.Search.map((item, i) => (
    data.push(item)
))

function Movie({navigation}){

    const [movieData, setMovieData] = React.useState(data)
    const [term, setTerm] = React.useState('')


    const filteredItems = (items, term) => {
        if(term.length === 0) {
            return items
        }
        if(term.trim().length === 0) {
           return items
        }
        return items.filter((item) => {
            if(
                item.Title
                    .replace(/[^a-zA-Z ]/g, "")
                    .toLowerCase()
                    // .replace(/,/g, '')
                    .indexOf(term)> -1 ||
                item.Year
                    .replace(/[^a-zA-Z ]/g, "")
                    .toLowerCase()
                    .indexOf(term) > -1 ||
                item.Type
                    .replace(/[^a-zA-Z ]/g, "")
                    .toLowerCase()
                    .indexOf(term) > -1 ){
                return (
                    item
                )
            }
        })
    }
    const visibleItems = filteredItems(movieData, term)

    const goHome = () => {
        navigation.navigate('Home');
    }

    const deleteElement = (id) => {
        const idx = movieData.findIndex((el) => el.imdbID === id)
        const newData = [...movieData.slice(0, idx),...movieData.slice(idx + 1)]
        setMovieData(newData)
    };


    return (
        <ScrollView>
            <View>
                <Appbar.Header theme={MyTheme}>
                    <Appbar.Action icon="home" onPress={goHome} />
                    <SearchBar
                        placeholder="Search here"
                        onChangeText={(text) =>
                            setTerm(
                                text.toLowerCase()
                                    .replace(/[^a-zA-Z ]/g, "")
                                    .replace(/\s+/g, ' ')
                                    .trim()
                                    .replace(/,/g, '')
                            )}
                        style={{flex: 1}}
                    />
                    <Appbar.Action
                        icon="plus"
                        onPress={() => {
                            navigation.navigate('AddForm', {
                                movieData:  movieData,
                                setMovieData: setMovieData
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View style={orientation().MainContainer}>
                {
                    visibleItems.map((item, index) => {
                        return(
                            <TouchableNativeFeedback
                                style={orientation().CardContainer}
                                key={index}
                                onPress={() => {
                                    navigation.navigate('Details');
                                    navigation.navigate('Details', {
                                        Title: item.Title,
                                        Poster: item.Poster,
                                        Type: item.Type,
                                    });
                                }}
                            >
                                <Card>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                    }}>
                                        <Text style={orientation().title}>{
                                            item.Title.length >= 60 ?
                                                item.Title.slice(0, 50 - 1) + '…'
                                                : item.Title
                                        }</Text>
                                        <View style={{
                                            marginLeft: 10,
                                            width: 20,
                                        }}>
                                            <Icon
                                                onPress={() => {
                                                    deleteElement(item.imdbID)
                                                }}
                                                style={[{
                                                    color: '#ff7271',
                                                    flex: 0,
                                                }]}
                                                size={25}
                                                name={'trash'}
                                            />
                                        </View>
                                    </View>
                                    <Card.Divider/>
                                    <View style={orientation().ViewContainer}>
                                        <Image
                                            resizeMode="cover"
                                            source={
                                                getImage(item.Poster)
                                            }
                                            style={orientation().img}
                                        />
                                        <View style={orientation().TextContainer}>
                                            <Text style={orientation().description}>{
                                                item.Type === '' ? 'movie' : item.Type
                                            }</Text>
                                            <Text style={orientation().description}>{
                                                item.Year === '' ?
                                                    ', year unknown' :
                                                    ' from ' + item.Year
                                            }</Text>
                                        </View>
                                    </View>
                                </Card>
                            </TouchableNativeFeedback>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default Movie
