import theme from './theme';

export const styles = {
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 2,
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
  },
  descriptionText: {
    flexGrow: 1,
  },
  dateText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.light,
    color: theme.colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    flexGrow: 0,
    marginRight: 20,
    height: 60,
    width: 60,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    alignSelf: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  githubContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  githubText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  primaryButtonText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    fontSize: 18,
    textAlign: 'center',
  },
  warningButtonText: {
    color: 'white',
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.roundness,
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    fontSize: 18,
    textAlign: 'center',
  },
};
