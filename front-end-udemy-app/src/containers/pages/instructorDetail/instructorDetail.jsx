// @flow
import * as React from "react";

import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Footer } from "../../footer/footer";
import teacherImg from "../../../public/image/teacher_1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
import { CourseCard } from "../../itemsPage";

import { reducer, INSTRUCTOR_DETAIL_ACTION } from "./reducer/reducer";
import { handleInstructorPage } from "./middleware/handleInstructorPage";
import "./style.scss";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import numeral from "numeral";

import $ from 'jquery'

const initData = {
  teacherInfo: {},
  courses: [],
};

export const InstructorDetail = (props) => {
  SwiperCore.use([Mousewheel, Pagination]);
  const [store_page, dispatch] = useReducer(reducer, initData);
  const params = useParams();

  useEffect(() => {
    (async () => {
      $("html,body").animate({ scrollTop: 0 }, 500);
      await handleInstructorPage.loadTeacher(params, dispatch);
      await handleInstructorPage.loadCourses(params, dispatch);
    })();
  }, []);

  return (
    <div className="instructor-detail">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      {Object.keys(store_page.teacherInfo).length && (
        <div className="body-page">
          <div className="body-page__header">
            <div className="wrap">
              <div className="instructor__summary">
                <div
                  className="instructor__summary-image"
                  style={{
                    backgroundImage: `url("http://localhost:3030/${store_page.teacherInfo.srcImage.replaceAll(
                      "\\",
                      "/"
                    )}")`,
                  }}
                ></div>
                <div className="summary-text">
                  <p className="summary-text__name">{`${store_page.teacherInfo.firstName} ${store_page.teacherInfo.lastName}`}</p>
                  <p className="summary-text__major">
                    {store_page.teacherInfo.major
                      ? store_page.teacherInfo.major
                      : "( Hiện chưa cập nhật chuyên môn )"}
                  </p>
                </div>
              </div>
              <div className="instructor__intro-achieve">
                <div className="achieve-item">
                  <p className="achieve-item__count">
                    {numeral(store_page.teacherInfo.studentCount).format("0,0")}
                  </p>
                  <p className="achieve-item__text">Học viên</p>
                </div>
                <div className="achieve-item">
                  <p className="achieve-item__count">
                    {store_page.teacherInfo.courseCount || 0}
                  </p>
                  <p className="achieve-item__text">Khóa học</p>
                </div>
                <div className="achieve-item">
                  <div className="achieve-item__count">
                    {numeral(store_page.teacherInfo.rate).format("0.0")}{" "}
                    <span className="text--smaller">
                      / 5 <i className="icon fa fa-star" aria-hidden="true"></i>
                    </span>
                  </div>
                  <p className="achieve-item__text">
                    {numeral(store_page.teacherInfo.feedbackCount || 0).format(
                      "0,0"
                    )}{" "}
                    lượt đánh giá
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="body-page__content">
            <div className="wrap">
              <div className="instructor__intro">
                <p className="section-title">Giới thiệu</p>
                <div>
                  {store_page.teacherInfo.teacherDesc ? (
                    <p
                      className="text-html"
                      dangerouslySetInnerHTML={{
                        __html: store_page.teacherInfo.teacherDesc,
                      }}
                    ></p>
                  ) : (
                    <p className="block-empty">(Hiện đang còn trống)</p>
                  )}
                </div>
              </div>
              <div className="instructor__technique">
                <p className="section-title">Kỹ Năng</p>
                <div>
                  {store_page.teacherInfo.technique ? (
                    <p
                      className="text-html"
                      dangerouslySetInnerHTML={{
                        __html: store_page.teacherInfo.technique,
                      }}
                    ></p>
                  ) : (
                    <p className="block-empty">(Hiện đang còn trống)</p>
                  )}
                </div>
              </div>
              <div className="instructor__courses">
                <p className="section-title">
                  Khóa học giảng dạy bởi giáo viên Hoàng Phúc Photo
                </p>

                {store_page.courses.length === 0 ? (
                  <p className="block-empty">(Hiện đang còn trống)</p>
                ) : (
                  (() => {
                    return store_page.courses.length <= 4 ? (
                      <Swiper
                        slidesPerView={4}
                        spaceBetween={16}
                        className="mySwiper block-courses"
                      >
                        {store_page.courses.map((course) => {
                          return (
                            <SwiperSlide className="slide-item">
                              <CourseCard
                                className="slide-item__card item--fill-max"
                                course={course}
                              ></CourseCard>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    ) : (
                      <Swiper
                        direction={"horizontal"}
                        mousewheel={true}
                        pagination={{
                          clickable: true,
                        }}
                        slidesPerView={4}
                        loop={true}
                        spaceBetween={16}
                        className="mySwiper block-courses"
                      >
                        {store_page.courses.map((course) => {
                          return (
                            <SwiperSlide className="slide-item">
                              <CourseCard
                                className="slide-item__card item--fill-max"
                                course={course}
                              ></CourseCard>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    );
                  })()
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer coverFooter="true"></Footer>
    </div>
  );
};

const dataSet = [
  {
    id: 1,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 2,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 3,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 4,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 5,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
];
