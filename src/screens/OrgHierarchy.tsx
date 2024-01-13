import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const OrgHierarchy: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.role}>CEO</Text>

            <View style={styles.teamContainer}>
                <Text style={styles.role}>Head of Staff/HR</Text>
            </View>

            <View style={styles.teamContainer}>
                <Text style={styles.role}>Team 1</Text>
                <Text style={styles.teamLeader}>Team Leader</Text>
                <Text style={styles.teamMember}>Team Member</Text>
            </View>

            <View style={styles.teamContainer}>
                <Text style={styles.role}>Team 2</Text>
                <Text style={styles.teamLeader}>Team Leader</Text>
                <Text style={styles.teamMember}>Team Member</Text>
            </View>

            <View style={styles.teamContainer}>
                <Text style={styles.role}>Head of Engineering</Text>
                <View style={styles.teamContainer}>
                    <Text style={styles.role}>Team</Text>
                    <Text style={styles.teamLeader}>Team Leader</Text>
                    <Text style={styles.teamMember}>Team Member</Text>
                </View>
            </View>

            <View style={styles.teamContainer}>
                <Text style={styles.role}>Head of Design</Text>
                <View style={styles.teamContainer}>
                    <Text style={styles.role}>Team</Text>
                    <Text style={styles.teamLeader}>Team Leader</Text>
                    <Text style={styles.teamMember}>Team Member</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    role: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
        color: '#333',
    },
    teamContainer: {
        marginVertical: 8,
        marginLeft: 16,
        borderLeftWidth: 2,
        borderColor: '#007BFF',
        paddingLeft: 10,
    },
    teamLeader: {
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#007BFF',
    },
    teamMember: {
        marginLeft: 32,
        color: '#555',
    },
});

export default OrgHierarchy;

