import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router-native';

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

const RepositoryItem = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  const history = useHistory();
  const onPress = () => {
    history.push(`/repo/${repository.id}`);
  };

  return (
    <TouchableOpacity onPress={onPress} testID="touch" style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>

        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {fullName}
          </Text>

          <Text
            testID="description"
            style={styles.descriptionText}
            color="textSecondary"
          >
            {description}
          </Text>

          {language ? (
            <View style={styles.languageContainer}>
              <Text testID="language" style={styles.languageText}>
                {language}
              </Text>
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
    </TouchableOpacity>
  );
};

export default RepositoryItem;
