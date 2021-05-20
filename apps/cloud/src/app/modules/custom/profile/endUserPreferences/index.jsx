import { KsGrid, KsIcon } from '@kleeen/react/components';
import { useKleeenContext, useNavigation, useUrlQueryParams } from '@kleeen/react/hooks';

import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  div_df0fc59c: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    display: 'flex',
    height: '100%',
  },
  section_4f231e1e: {
    display: 'flex',
    'flex-direction': 'column',
    flex: '1',
    'overflow-y': 'auto',
  },
  div_8b17bb84: {
    display: 'flex',
  },
  div_eac91d97: {
    margin: 'var(--size-size4)',
    padding: 'var(--size-size4)',
    display: 'flex',
    'flex-direction': 'column',
    'max-height': '50%',
    width: 'var(--size-size23)',
  },
  div_2303d478: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_66acb62b: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_1897b17e: {
    margin: 'var(--size-size4)',
    padding: 'var(--size-size4)',
    width: 'var(--size-size18)',
    height: 'var(--size-size18)',
  },
  img_5b8d6a12: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  a_26a2ca83: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_79c69299: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    'align-items': 'center',
    display: 'flex',
    'flex-direction': 'row',
  },
  div_be9187fc: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_2a4ba612: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    width: 'var(--size-size11)',
    height: 'var(--size-size11)',
  },
  div_71f0b5f5: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  div_40887f84: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_140c0f8c: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    'max-width': 'var(--size-size18)',
    'text-align': 'center',
  },
  div_476af006: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_5c863925: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_ae15681b: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size4)',
  },
  div_91ed8fd7: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size2)',
  },
  h1_b00ab67a: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_1dc6eb70: {
    'font-size': 'var(--size-text3XL)',
    margin: 'var(--size-size3) var(--size-size6) var(--size-size5)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_9313c23a: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size2)',
  },
  div_fe127c64: {
    'font-size': 'var(--size-textM)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_54e62e93: {
    margin: 'var(--size-size10)',
    padding: 'var(--size-size10)',
    flex: '1',
  },
  div_c6958acc: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size6) var(--size-size2)',
    display: 'flex',
    'flex-direction': 'column',
  },
  div_ff17da40: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size2)',
  },
  div_48d95017: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_7d9061bc: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    width: 'var(--size-size11)',
    height: 'var(--size-size11)',
  },
  h3_3d782f6a: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_654c4d8d: {
    'font-size': 'var(--size-textXL)',
    margin: 'var(--size-size0) var(--size-size4) var(--size-size2)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_d99f0917: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_ab7d7ec4: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_20ad439d: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size4)',
  },
  div_61c98b85: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size2)',
  },
  h4_a12c4c7f: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_caaa6599: {
    'font-size': 'var(--size-textL)',
    margin: 'var(--size-size0) var(--size-size4) var(--size-size2)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_16fe828b: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size2)',
  },
  div_0cff4981: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size2)',
  },
  div_4b86fd3d: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_d7fbec5b: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_da96e9b0: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    display: 'flex',
    'flex-direction': 'column',
  },
  div_0fb82af1: {
    margin: 'var(--size-size2) var(--size-size6)',
    padding: 'var(--size-size2)',
    display: 'flex',
    'flex-direction': 'row',
  },
  div_d4570dd7: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_3a9eb36d: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
  },
  div_7aa0795b: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  div_0573ec41: {
    'font-size': 'var(--size-textM)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_184f3bcc: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    'max-width': 'var(--size-size18)',
    'text-align': 'center',
  },
  div_04d1c041: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_eb22d653: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_e67e0246: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_61bbc7df: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    'align-items': 'center',
    display: 'flex',
    'flex-direction': 'row',
  },
  div_bff8733f: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_e0d3e365: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    width: 'var(--size-size11)',
    height: 'var(--size-size11)',
  },
  div_81316bf3: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  div_7f54390d: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_7a9d9daa: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    'max-width': 'var(--size-size18)',
    'text-align': 'center',
  },
  div_b8f487d1: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_38d7d93a: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_818c47fe: {
    margin: 'var(--size-size2) var(--size-size6)',
    padding: 'var(--size-size2)',
    display: 'flex',
    'flex-direction': 'row',
  },
  div_8f41a93e: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_aecee087: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
  },
  div_bbea00df: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  div_5b394017: {
    'font-size': 'var(--size-textM)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_e9a7e29e: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    'max-width': 'var(--size-size18)',
    'text-align': 'center',
  },
  div_302a880a: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_ae08625c: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_e30884a5: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_b1290016: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    'align-items': 'center',
    display: 'flex',
    'flex-direction': 'row',
  },
  div_af422f9f: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_6feba7cd: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    width: 'var(--size-size11)',
    height: 'var(--size-size11)',
  },
  div_a7006047: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  div_d4585ca8: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_a38c9bab: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    'max-width': 'var(--size-size18)',
    'text-align': 'center',
  },
  div_5bfb011a: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_4cc3a681: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_887de5a5: {
    margin: 'var(--size-size2) var(--size-size6)',
    padding: 'var(--size-size2)',
    display: 'flex',
    'flex-direction': 'row',
  },
  div_de5d0fb3: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_3a3a4b43: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
  },
  div_e25a46ad: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  div_f7fecb3d: {
    'font-size': 'var(--size-textM)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_697e0f86: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    'max-width': 'var(--size-size18)',
    'text-align': 'center',
  },
  div_c0b1b3e6: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_8bd66468: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_ac0a32ff: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_a31feffe: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    'align-items': 'center',
    display: 'flex',
    'flex-direction': 'row',
  },
  div_803cfa38: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
  },
  div_9d41036d: {
    margin: 'var(--size-size1)',
    padding: 'var(--size-size0)',
    width: 'var(--size-size11)',
    height: 'var(--size-size11)',
  },
  div_50bac321: {
    margin: 'var(--size-size0)',
    padding: 'var(--size-size0)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  div_c4e59a05: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
  div_7fb2d706: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
    'max-width': 'var(--size-size18)',
    'text-align': 'center',
  },
  div_889ab6f9: {
    margin: 'var(--size-size2)',
    padding: 'var(--size-size2)',
  },
  div_b9a8558e: {
    'font-size': 'var(--size-textS)',
    margin: 'var(--size-size0) var(--size-size3) var(--size-size1)',
    padding: 'var(--size-size0)',
    display: 'inline-block',
  },
};

const UserPreferences = ({ classes, className = '', translate, ...props }) => {
  const navigate = useNavigation();
  const userPreferences = useKleeenContext('endUserPreferences');

  return (
    <div className={`${classes.div_df0fc59c} ${className} background_elevation_0_static profile-01`}>
      <section className={`${classes.section_4f231e1e}`}>
        {/*  */}
        <div className={`${classes.div_eac91d97} background_elevation_1A_static page_intro-01`}>
          <div className={`${classes.div_2303d478} page_intro_image_individual`}>
            <div className={`${classes.div_66acb62b} body_image_individual_page-02`}>
              <div className={`${classes.div_1897b17e} image_medium`}>
                <img
                  className={`${classes.img_5b8d6a12} primitive_image`}
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                ></img>
              </div>
            </div>
          </div>

          <a
            className={`${classes.a_26a2ca83} button_edit_whole_page`}
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigate('/profile/endUserPreferences/edit', true);
            }}
          >
            <div className="ks-flyout-alt-text-container identity_button-01">
              <div className={`${classes.div_79c69299} identity_simple-03`}>
                <div className={`${classes.div_be9187fc} body_icon_page`}>
                  <div className={`${classes.div_2a4ba612} icon_small_0x`}>
                    <KsIcon icon="ks-edit"></KsIcon>
                  </div>
                </div>
                <div className={`${classes.div_71f0b5f5} text_one_line_truncated_at_end-08`}>
                  <div className={`${classes.div_40887f84} text_small_0x`}>
                    <span className="primitive_text">Edit Profile</span>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <div className={`${classes.div_ae15681b} page_intro_text`}>
            <div className={`${classes.div_9313c23a} foreground_principal_no_background_static page_body`}>
              <div className={`${classes.div_fe127c64} text_medium`}>
                <span className="primitive_text">Edit your profile preference</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${classes.div_54e62e93} widget_group_area`}>
          <div className={`${classes.div_c6958acc} widget_group_item`}>
            <div
              className={`${classes.div_ff17da40} foreground_principal_no_background_static widget_group_title`}
            >
              <h3 className={`${classes.h3_3d782f6a} h3_title_page`}>
                <div className={`${classes.div_654c4d8d} text_large_1x`}>
                  <span className="primitive_text">
                    {translate({
                      id: 'app.globalNav.userPreferences',
                    })}
                  </span>
                </div>
              </h3>
            </div>
            <div className={`${classes.div_d99f0917} widget_group_type`}>
              <div className="widget_group-01">
                <KsGrid>
                  <div
                    className={`${classes.div_ab7d7ec4} background_elevation_1B_static widget_individual-01`}
                  >
                    <div className={`${classes.div_16fe828b} widget_individual_substance_area-02`}>
                      <div className={`${classes.div_0cff4981} widget_individual_substance_sub_area-01`}>
                        <div className={`${classes.div_4b86fd3d} widget_individual_substance_item-02`}>
                          <div className={`${classes.div_d7fbec5b} display_data_interactive-01`}>
                            <div className={`${classes.div_da96e9b0} list_key_value_pairs`}>
                              <div className={`${classes.div_818c47fe} key_value_pair_item`}>
                                <div
                                  className={`${classes.div_8f41a93e} foreground_principal_no_background_static key_value_pair__key`}
                                >
                                  <div className="ks-flyout-alt-text-container identity_button-03">
                                    <div className={`${classes.div_aecee087} identity_simple-02`}>
                                      <div
                                        className={`${classes.div_bbea00df} text_one_line_truncated_at_end-07`}
                                      >
                                        <div className={`${classes.div_5b394017} text_medium`}>
                                          <span className="primitive_text">
                                            {translate({
                                              id: 'entities.endUserPreferences.theme',
                                            })}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="ks-flyout-alt-text">
                                      <div
                                        className={`${classes.div_e9a7e29e} background_elevation_2C_static flyout_for_alt_text`}
                                      >
                                        <div className={`${classes.div_302a880a} identity_alt_text`}>
                                          <div className={`${classes.div_ae08625c} text_small_0x`}>
                                            <span className="primitive_text">
                                              {translate({
                                                id: 'entities.endUserPreferences.theme',
                                              })}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={`${classes.div_e30884a5} foreground_principal_no_background_clickable foreground_principal_no_background_static foreground_principal_no_background_hoverable key_value_pair__value`}
                                >
                                  <div className="ks-flyout-alt-text-container identity_button-04">
                                    <div className={`${classes.div_b1290016} identity_simple-03`}>
                                      <div
                                        className={`${classes.div_a7006047} text_one_line_truncated_at_end-08`}
                                      >
                                        <div className={`${classes.div_d4585ca8} text_small_0x`}>
                                          <span className="primitive_text">{userPreferences.theme}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={`${classes.div_887de5a5} key_value_pair_item`}>
                                <div
                                  className={`${classes.div_de5d0fb3} foreground_principal_no_background_static key_value_pair__key`}
                                >
                                  <div className="ks-flyout-alt-text-container identity_button-03">
                                    <div className={`${classes.div_3a3a4b43} identity_simple-02`}>
                                      <div
                                        className={`${classes.div_e25a46ad} text_one_line_truncated_at_end-07`}
                                      >
                                        <div className={`${classes.div_f7fecb3d} text_medium`}>
                                          <span className="primitive_text">
                                            {translate({
                                              id: 'entities.endUserPreferences.locale',
                                            })}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="ks-flyout-alt-text">
                                      <div
                                        className={`${classes.div_697e0f86} background_elevation_2C_static flyout_for_alt_text`}
                                      >
                                        <div className={`${classes.div_c0b1b3e6} identity_alt_text`}>
                                          <div className={`${classes.div_8bd66468} text_small_0x`}>
                                            <span className="primitive_text">
                                              {translate({
                                                id: 'entities.endUserPreferences.locale',
                                              })}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={`${classes.div_ac0a32ff} foreground_principal_no_background_clickable foreground_principal_no_background_static foreground_principal_no_background_hoverable key_value_pair__value`}
                                >
                                  <div className="ks-flyout-alt-text-container identity_button-04">
                                    <div className={`${classes.div_a31feffe} identity_simple-03`}>
                                      <div
                                        className={`${classes.div_50bac321} text_one_line_truncated_at_end-08`}
                                      >
                                        <div className={`${classes.div_c4e59a05} text_small_0x`}>
                                          <span className="primitive_text">{userPreferences.locale}</span>
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
                    </div>
                  </div>
                </KsGrid>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KUIConnect(({ translate }) => ({ translate }))(injectSheet(styles)(UserPreferences));
