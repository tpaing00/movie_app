import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MoviesContainer from '../containers/MoviesContainer';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, SelectIcon, ChevronDownIcon, Icon } from '@gluestack-ui/themed';
import { fetchShows } from '../../services/api';

const TvShows = ({ navigation }) => {
    const [tvCategory, setTvCategory] = useState('popular');
    const [tvs, setTvs] = useState([]);

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
            })
            .catch(error => {
                console.error(error);
            })
    }, [tvCategory]);

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
            <MoviesContainer movies={tvs} navigation={navigation} />
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

export default TvShows;