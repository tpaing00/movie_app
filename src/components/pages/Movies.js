import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MoviesContainer from '../containers/MoviesContainer';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem , SelectIcon, ChevronDownIcon, Icon, ButtonIcon, ChevronLeftIcon, ChevronRightIcon} from '@gluestack-ui/themed';
import { fetchShows } from '../../services/api';
import { Button } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';

const ITEMS_PER_PAGE = 10;

const Movies = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('now_playing');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const tvCategories = [
        { key: 'now_playing', value: 'Now Playing' },
        { key: 'popular', value: 'Popular' },
        { key: 'top_rated', value: 'Top Rated' },
        { key: 'upcoming', value: 'Upcoming' }
    ];

    useEffect(() => {
        fetchShows("movie", selectedCategory)
        .then((response) => {
            setMovies(response.data.results);
            setCurrentPage(1);
        })
        .catch( error => {
            console.error(error);
        })
    }, [selectedCategory]);

    const paginatedMovies = movies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleNextPage = () => {
        if (currentPage < Math.ceil(movies.length / ITEMS_PER_PAGE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchTypeChange = (value) => {
        setSelectedCategory(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <Select value={selectedCategory} mr={5} onValueChange={handleSearchTypeChange} style={styles.selectContainer}>
                    <SelectTrigger variant="outline" size="xs">
                        <SelectInput placeholder="Search Type" />
                        <SelectIcon pr={25}>
                            <Icon as={ChevronDownIcon} />
                        </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {tvCategories.map((option) => (
                                <SelectItem
                                    key={option.key}
                                    label={option.value}
                                    value={option.key}
                                    style={option.key === selectedCategory ? styles.selectedItem : null}
                                />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>
            <MoviesContainer movies={paginatedMovies} navigation={navigation} />

            <View style={styles.paginationContainer}>
                <TouchableOpacity
                    style={[styles.button, currentPage === 1 && styles.disabledButton]} 
                    onPress={handlePreviousPage} 
                    disabled={currentPage === 1}>
                    <Icon as={ChevronLeftIcon} color={currentPage === 1 ? 'lightgray' : 'white'} size="sm" />
                </TouchableOpacity>

                <Text style={styles.pageText}>Page {currentPage}</Text>

                <TouchableOpacity 
                    style={[styles.button, currentPage === Math.ceil(movies.length / ITEMS_PER_PAGE) && styles.disabledButton]} 
                    onPress={handleNextPage} 
                    disabled={currentPage === Math.ceil(movies.length / ITEMS_PER_PAGE)}>
                    <Icon as={ChevronRightIcon} color={currentPage === Math.ceil(movies.length / ITEMS_PER_PAGE) ? 'lightgray' : 'white'} size="sm" />
                </TouchableOpacity>
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
        width: '100%',
        paddingRight: 20,
    },
    selectedItem: {
        backgroundColor: 'darkgray',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
    },
    pageText: {
        fontSize: 18,
    },
    button: {
        backgroundColor: 'darkgray',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: 'lightgray',
    },
});

export default Movies;