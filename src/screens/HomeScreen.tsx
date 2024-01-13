import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name,
      phoneNumber,
      email,
    };

    setTeamMembers([...teamMembers, newMember]);
    setFilteredMembers([...teamMembers, newMember]);
    setModalVisible(false);


    setName('');
    setId('');
    setPhoneNumber('');
    setEmail('');
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

    if (member) {
      setName(member.name);
      setId(String(member.id));
      setPhoneNumber(member.phoneNumber);
      setEmail(member.email);
    } else {
      setName('');
      setId('');
      setPhoneNumber('');
      setEmail('');
    }
  };

  const updateTeamMember = (id: number, name: string, phoneNumber: string, email: string) => {
    const updatedMembers = teamMembers.map((member) =>
      member.id === id ? { ...member, name, phoneNumber, email } : member
    );

    setTeamMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
  };

  const removeTeamMember = (id: number) => {
    const updatedMembers = teamMembers.filter((member) => member.id !== id);

    setTeamMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
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
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="ID"
              value={id}
              onChangeText={(text) => setId(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Button
              title={selectedMember ? 'Update Team Member' : 'Add Team Member'}
              onPress={() => {
                if (selectedMember) {
                  updateTeamMember(
                    selectedMember.id,
                    name,
                    phoneNumber,
                    email
                  );
                } else {
                  addTeamMember();
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
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


export default TeamScreen;