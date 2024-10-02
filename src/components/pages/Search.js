import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, ButtonIcon, ButtonText, HStack, Icon, Input, InputField, InputIcon, VStack } from '@gluestack-ui/themed';
import { FormControl, FormControlLabelText, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@gluestack-ui/themed';
import { SearchIcon } from '@gluestack-ui/themed';
import MoviesContainer from '../containers/MoviesContainer';
import { fetchSearch } from '../../services/api';

const Search = ({ navigation }) => {
    const [searchCategory, setSearchCategory] = useState('movie');
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [searchInitiated, setSearchInitiated] = useState(false);

    const searchCategories = [
        { key: 'Multi', value: 'multi' },
        { key: 'TV Show', value: 'tv' },
        { key: 'Movie', value: 'movie' },
    ];

    const handleSearch = () => {
        setSearchInitiated(true);
        fetchSearch(search, searchCategory);
    };

    useEffect(() => {
        if (search) {
            fetchSearch(search, searchCategory)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch( error => {
                console.error(error);
            })
        }
    }, [searchCategory]);

    const handleSearchTypeChange = (value) => {
        setSearchCategory(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <VStack space={4} width="100%">
                    <FormControl isRequired={true}>
                        <FormControl.Label style={styles.labelStyles}>
                            <FormControlLabelText>Search Movie/TV Show Name</FormControlLabelText>
                        </FormControl.Label>
                        <HStack width="100%" space={2} alignItems="center">
                            <Input width="80%" flexDirection="row" alignItems="center">
                                <InputIcon ml={5}>
                                    <Icon as={SearchIcon}/>
                                </InputIcon>
                                <InputField
                                    placeholder="i.e. James Bond, CSI"
                                    value={search}
                                    onChangeText={setSearch}
                                    style={{ flex: 1 }}
                                />
                            </Input>
                        </HStack>
                        <FormControl.Label style={styles.labelStyles}>
                            <FormControlLabelText>Choose Search Type</FormControlLabelText>
                        </FormControl.Label>
                        <HStack space={2} alignItems="center" justifyContent="center">
                            <Select value={searchCategory} onValueChange={handleSearchTypeChange} style={styles.selectContainer}>
                                <SelectTrigger variant="outline" size="md">
                                    <SelectInput placeholder="Search Type" />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        {searchCategories.map((option) => (
                                            <SelectItem key={option.value} label={option.key} value={option.value} />
                                        ))}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                            <View style={styles.spacer} />
                            <Button onPress={handleSearch} style={[styles.searchButton, styles.cyanButton]}>
                                <ButtonIcon as={SearchIcon} mr='$2' />
                                <ButtonText>Search</ButtonText>
                            </Button>
                        </HStack>
                    </FormControl>
                </VStack>
            </View>
            <View style={styles.contentContainer}>
                {searchInitiated ? (
                    movies.length > 0 ? (
                        <MoviesContainer movies={movies} navigation={navigation} />
                    ) : (
                        <Text style={styles.initiateText} >No results found. Please try a different search term.</Text>
                    )
                ) : (
                    <Text style={styles.initiateText}>Please initiate a search</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectContainer: {
        flex: 1,
        alignItems: 'center', 
    },
    contentContainer: {
        flex: 0.9,
    },
    labelStyles: {
        marginTop: 2, 
        fontSize: 'sm',
        paddingBottom: 5
    },
    spacer: {
        width: 10, 
    },
    searchButton: {
        marginTop: -2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cyanButton: {
        backgroundColor: '#00bcd4',
    },
    initiateText: {
        paddingTop: 150,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Search;