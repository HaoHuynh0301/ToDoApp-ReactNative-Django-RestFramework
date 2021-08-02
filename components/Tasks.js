import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

function Task(props) {
    return(
        <View style = {styles.item}>
            <View style = {styles.itemLeft}>
                <TouchableOpacity style = {styles.square}></TouchableOpacity>
                <Text style = {styles.itemText}>{ props.text }</Text>
            </View>
            <View style = {styles.circular}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginLeft: 5,
        marginRight: 20,
        marginBottom: 10,
        padding: 15,
        paddingLeft: 20,
        backgroundColor: "#FFF",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    square: {
        height: 24,
        width: 24,
        borderRadius: 10,
        backgroundColor: "#3399ff",
        opacity: 0.4
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    itemText: {
        marginLeft: 10
    },
    circular: {
        height: 12,
        width: 12,
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        borderColor: "#3399ff",
    }
});

export default Task;