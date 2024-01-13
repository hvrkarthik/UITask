import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal, ScrollView, StyleSheet } from 'react-native';
import OrgHierarchy from './OrgHierarchy';

interface TeamMember {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}

const TeamScreen: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const addTeamMember = (name: string, id: string, phoneNumber: string, email: string) => {
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name,
      phoneNumber,
      email,
    };

    setTeamMembers([...teamMembers, newMember]);
    setFilteredMembers([...teamMembers, newMember]); 
    setModalVisible(false);
  };

  const filterMembers = (searchText: string) => {
    const filtered = teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.phoneNumber.includes(searchText) ||
        member.email.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredMembers(filtered);
  };

  const openModal = (member: TeamMember | null = null) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Team Members</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by Name, Phone Number, or Email"
        onChangeText={(text) => filterMembers(text)}
      />

      <Button
        title="Add Team Member"
        onPress={() => openModal()}
        style={styles.addButton}
      />

      {filteredMembers.map((member) => (
        <View key={member.id} style={styles.memberContainer}>
          <Text style={styles.memberText}>{`Name: ${member.name}`}</Text>
          <Text style={styles.memberText}>{`ID: ${member.id}`}</Text>
          <Text style={styles.memberText}>{`Phone Number: ${member.phoneNumber}`}</Text>
          <Text style={styles.memberText}>{`Email: ${member.email}`}</Text>
          <Button
            title="Update"
            onPress={() => openModal(member)}
            style={styles.addButton}
          />
          <Button
            title="Remove"
            onPress={() => removeTeamMember(member.id)}
            style={styles.addButton}
          />
        </View>
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              placeholder="ID"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
            />
            <Button
              title={selectedMember ? 'Update Team Member' : 'Add Team Member'}
              onPress={() => {
                if (selectedMember) {
                  updateTeamMember(
                    selectedMember.id,
                    'Updated Name',
                    'Updated Phone Number',
                    'Updated Email'
                  );
                } else {
                  addTeamMember('New Name', 'New Phone Number', 'New Email');
                }
                setModalVisible(false);
              }}
              style={styles.modalButton}
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>

      <OrgHierarchy />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#007BFF', 
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF', 
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007BFF', 
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff', 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  memberContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd', 
    borderRadius: 5,
  },
  memberText: {
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    marginBottom: 20
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TeamScreen;
