import * as Linking from 'expo-linking';
import React from 'react';
import { Dimensions, FlatList, Image, Platform, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import useSingleRepository from '../hooks/useSingleRepository';
import { styles as repoStyles } from '../repositoryItemStyles.js';
import formatInThousands from '../utils/formatInThousands';
import Text from './Text';

const styles = StyleSheet.create(repoStyles);

const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight="bold">
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryInfo = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = { ...repository };

  const onPress = () => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            {fullName}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>{language}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <CountItem count={stargazersCount} label="Stars" />
        <CountItem count={forksCount} label="Forks" />
        <CountItem count={reviewCount} label="Reviews" />
        <CountItem count={ratingAverage} label="Rating" />
      </View>

      <View style={styles.githubContainer}>
        <Text onPress={() => onPress(url)} style={styles.githubText}>
          Open in GitHub
        </Text>
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 15 }}>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={{ flexGrow: 1, flexShrink: 1 }}>
          <Text style={styles.nameText}>{review.repository.fullName}</Text>
          <Text style={styles.dateText}>{review.createdAt.slice(0, 10)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useSingleRepository({
    id,
    first: 4,
  });

  const onEndReach = () => {
    fetchMore();
  };

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node) : [];

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({ highlighted }) => (
            <View
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          ))
        }
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SingleRepositoryItem;
