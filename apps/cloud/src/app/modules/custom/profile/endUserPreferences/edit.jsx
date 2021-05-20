import { KsGrid, KsLocaleSwitcher, KsThemeSwitcher } from '@kleeen/react/components';
import React, { useEffect, useState } from 'react';
import {
  useKleeenActions,
  useKleeenContext,
  useLocalization,
  useNavigation,
  useTheme,
} from '@kleeen/react/hooks';

import { KSAuth } from '@kleeen/auth';
import { KUIConnect } from '@kleeen/core-react';
import injectSheet from 'react-jss';
import { styles } from './edit.styles';

const END_USER_PREFERENCES_URL = '/profile/endUserPreferences';

const UserPreferencesEdit = ({ classes, className = '', translate, ...props }) => {
  const navigate = useNavigation();
  const { language, setLanguage } = useLocalization();
  const { theme, setTheme } = useTheme();

  const [userPreferencesForm] = useState({
    userId: '',
  });
  const userPreferencesActions = useKleeenActions('endUserPreferences');
  const { currentUserPreferences, isLoading, error } = useKleeenContext('endUserPreferences');

  const [componentSaving, setComponentSaving] = useState(false);
  useEffect(() => {
    if (componentSaving && !isLoading && !error) {
      setComponentSaving(false);
      navigate(END_USER_PREFERENCES_URL, true);
    }
  }, [componentSaving, error, isLoading, navigate]);

  const savePreferences = () => {
    setComponentSaving(true);
    KSAuth.currentAuthenticatedUser().then((user) => {
      if (currentUserPreferences) {
        userPreferencesActions.saveEndUserPreferences({
          ...currentUserPreferences,
          userId: user.username,
        });
      }
    });
  };

  function onChangeLocale(event) {
    setLanguage(event.target.value);
    savePreferences();
  }

  function onChangeThemeKit(event) {
    setTheme({
      ...theme,
      kit: event.target.value,
    });
  }

  return (
    <div
      className={`${classes.div_366cd7ab} ${className} background_elevation_4B_static profile_configuration-01`}
    >
      <section className={`${classes.section_6a86fb73}`}>
        <section className={`${classes.section_4376a8f9}`}>
          <div className={`${classes.div_f43f1c2b} widget_group_area`}>
            <div className={`${classes.div_8a4f377d} widget_group_item`}>
              <div className={`${classes.div_aba17745} widget_group_type`}>
                <div className={`${classes.div_5d670609} widget_group-02`}>
                  <KsGrid>
                    <div
                      className={`${classes.div_ca3be445} background_elevation_1B_static widget_individual-02`}
                    >
                      <div className={`${classes.div_d061598b} widget_individual_intro`}>
                        <div
                          className={`${classes.div_fe908c0e} foreground_principal_no_background_static widget_individual_title`}
                        >
                          <h4 className={`${classes.h4_c7eaabca} h4_title_page`}>
                            <div className={`${classes.div_52f1ab90} text_large_0x`}>
                              <span className="primitive_text">
                                {translate({
                                  id: 'app.globalNav.userPreferences',
                                })}
                              </span>
                            </div>
                          </h4>
                        </div>
                      </div>
                      <div className={`${classes.div_dc73dea8} widget_individual_substance_area-02`}>
                        <div className={`${classes.div_c4ae4143} widget_individual_substance_sub_area-01`}>
                          <div className={`${classes.div_51ab7d76} widget_individual_substance_item-01`}>
                            <div
                              className={`${classes.div_f90511f9} accepts_user_choice-01`}
                              value={userPreferencesForm.userId}
                            >
                              <div className={`${classes.div_7607aba4} user_choice_execute_manual`}>
                                <div className={`${classes.div_2bd76c40}`}>
                                  <div className={`${classes.div_aa36f90e} input_field`}>
                                    <div className={`${classes.div_48e12b48} input_acceptor`}>
                                      <div className={`${classes.div_d39baac4} text-input input_type-01`}>
                                        <label>
                                          <h5 className={`${classes.h5_ce298c35} h5_title_page`}>
                                            <div className={`${classes.div_5aa20f50} text_medium`}>
                                              <span className="primitive_text">
                                                {translate({
                                                  id: 'entities.endUserPreferences.locale',
                                                })}
                                              </span>
                                            </div>
                                          </h5>
                                        </label>
                                        <KsLocaleSwitcher
                                          locale={language}
                                          onChange={onChangeLocale}
                                        ></KsLocaleSwitcher>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`${classes.div_51ab7d76} widget_individual_substance_item-01`}>
                            <div
                              className={`${classes.div_f90511f9} accepts_user_choice-01`}
                              value={userPreferencesForm.userId}
                            >
                              <div className={`${classes.div_7607aba4} user_choice_execute_manual`}>
                                <div className={`${classes.div_2bd76c40}`}>
                                  <div className={`${classes.div_aa36f90e} input_field`}>
                                    <div className={`${classes.div_48e12b48} input_acceptor`}>
                                      <div className={`${classes.div_d39baac4} text-input input_type-01`}>
                                        <label>
                                          <h5 className={`${classes.h5_ce298c35} h5_title_page`}>
                                            <div className={`${classes.div_5aa20f50} text_medium`}>
                                              <span className="primitive_text">
                                                {translate({
                                                  id: 'entities.endUserPreferences.theme',
                                                })}
                                              </span>
                                            </div>
                                          </h5>
                                        </label>
                                        <KsThemeSwitcher
                                          theme={theme.kit}
                                          onChange={onChangeThemeKit}
                                        ></KsThemeSwitcher>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </KsGrid>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default KUIConnect(({ translate }) => ({ translate }))(injectSheet(styles)(UserPreferencesEdit));
