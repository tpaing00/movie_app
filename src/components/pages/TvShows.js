import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MoviesContainer from '../containers/MoviesContainer';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, SelectIcon, ChevronDownIcon, Icon, ChevronLeftIcon, ChevronRightIcon } from '@gluestack-ui/themed';
import { fetchShows } from '../../services/api';
import { Text } from '@gluestack-ui/themed';

const ITEMS_PER_PAGE = 10;

const TvShows = ({ navigation }) => {
    const [tvCategory, setTvCategory] = useState('popular');
    const [tvs, setTvs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        { key: 'airing_today', value: 'Airing Today' },
        { key: 'on_the_air', value: 'On The Air' },
        { key: 'popular', value: 'Popular' },
        { key: 'top_rated', value: 'Top Rated' }
    ];

    useEffect(() => {
        fetchShows("tv", tvCategory)
            .then((response) => {
                setTvs(response.data.results);
                setCurrentPage(1);
            })
            .catch(error => {
                console.error(error);
            })
    }, [tvCategory]);

    const paginatedTvs = tvs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleNextPage = () => {
        if (currentPage < Math.ceil(tvs.length / ITEMS_PER_PAGE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleTvCategoryChange = (value) => {
        setTvCategory(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <Select value={tvCategory} onValueChange={handleTvCategoryChange} style={styles.selectContainer}>
                    <SelectTrigger variant="outline" size="xs">
                        <SelectInput placeholder="Select TV Category" />
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
                            {categories.map((option) => (
                                <SelectItem
                                    key={option.key}
                                    label={option.value}
                                    value={option.key}
                                    style={option.key === tvCategory ? styles.selectedItem : null}
                                />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>
            <MoviesContainer movies={paginatedTvs} navigation={navigation} />
            <View style={styles.paginationContainer}>
                <TouchableOpacity 
                    style={[styles.button, currentPage === 1 && styles.disabledButton]} 
                    onPress={handlePreviousPage} 
                    disabled={currentPage === 1}>
                    <Icon as={ChevronLeftIcon} color={currentPage === 1 ? 'lightgray' : 'white'} size="sm" />
                </TouchableOpacity>

                <Text style={styles.pageText}>Page {currentPage}</Text>

                <TouchableOpacity 
                    style={[styles.button, currentPage === Math.ceil(tvs.length / ITEMS_PER_PAGE) && styles.disabledButton]} 
                    onPress={handleNextPage} 
                    disabled={currentPage === Math.ceil(tvs.length / ITEMS_PER_PAGE)}>
                    <Icon as={ChevronRightIcon} color={currentPage === Math.ceil(tvs.length / ITEMS_PER_PAGE) ? 'lightgray' : 'white'} size="sm" />
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

export default TvShows;