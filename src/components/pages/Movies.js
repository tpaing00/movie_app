import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MoviesContainer from '../containers/MoviesContainer';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem , SelectIcon, ChevronDownIcon, Icon} from '@gluestack-ui/themed';
import { fetchShows } from '../../services/api';

const Movies = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('now_playing');
    const [movies, setMovies] = useState([]);

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
        })
        .catch( error => {
            console.error(error);
        })
    }, [selectedCategory]);

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
            <MoviesContainer movies={movies} navigation={navigation} />
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
    }
});

export default Movies;