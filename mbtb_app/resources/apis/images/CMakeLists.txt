cmake_minimum_required(VERSION 3.7)
project(CZIImages)
set(CMAKE_CXX_STANDARD 14)



# Configure required libraries
if(UNIX) # Darwin or Linux

if(Linux)
    find_package(Openssl REQUIRED)
    find_package(zlib REQUIRED)
    find_package(cppresksdk REQUIRED)
    find_package(MYSQLCPPCONN REQUIRED)
endif()

    if(APPLE)
        set( OPENSSL_ROOT_DIR "/usr/local/opt/openssl/")
        find_package(OpenSSL REQUIRED)
        if ( OPENSSL_FOUND )
            message(STATUS "OpenSSL Found: ${OPENSSL_VERSION}")
            message(STATUS "OpenSSL Include: ${OPENSSL_INCLUDE_DIR}")
            message(STATUS "OpenSSL Libraries: ${OPENSSL_LIBRARIES}")
        endif()

        find_package(cpprestsdk REQUIRED)

        # Using homebrew library (sym links) instead of xcode, also cahnge include dir and libs path below
        set( PNG_ROOT_DIR "/usr/local/opt/libpng/")
        find_package(PNG)
    endif()

else()
    message(FATAL_ERROR "-- Platform not supported :( ")
endif()



# Configure compiler
if(CMAKE_CXX_COMPILER_ID MATCHES "Clang")

    message("-- configuring clang options")
    set(CMAKE_CXX_FLAGS "-arch x86_64 -std=c++14 -stdlib=libc++ -DBOOST_LOG_DYN_LINK -Wno-deprecated-declarations")

elseif(CMAKE_CXX_COMPILER_ID MATCHES "GNU")

    message("-- configuring gcc options")

    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=gnu++14 -DBOOST_LOG_DYN_LINK")

endif()




# sub directories
add_subdirectory(libs)

# source files
add_executable(${PROJECT_NAME}  src/CZIImage.cpp
                                ./src/czi_image/CZIController.cpp ./src/czi_image/TissueMetaData.cpp
                                ./src/rest_base/Controller.cpp ./src/rest_base/Router.cpp
                                ./src/db/DBConnection.cpp ./src/db/DBTissueMetaData.cpp ./src/db/DBAdminAuthentication.cpp ./src/db/DBUserAuthentication.cpp
                                ./src/auth/Authentication.cpp
                                ./src/config/Configuration.cpp
                                ./libs/libCZI/Src/CZICmd/SaveBitmap.cpp ./libs/libCZI/Src/CZICmd/utils.cpp
        )



# include header files
set(CONFIG_INCLUDE_DIR "./src/config/include/")
set(REST_INCLUDE_DIR "./src/rest_base/include/")  # REST Base dir
set(CZI_IMAGE_INCLUDE_DIR "./src/czi_image/include/")  # CZI Image dir
set(DB_INCLUDE_DIR "./src/db/include/")  # DB dir
set (AUTH_INCLUDE_DIR "./src/auth/include/")  # AUTH dir
set(MYSQLCONN_INCLUDE_DIR "/usr/local/Cellar/mysql-connector-c++/8.0.19/include/")  # mysqlx connector
set( PNG_INCLDE_DIR "usr/local/opt/libpng/include/")
set(HEADER_SEARCH_PATHS ${Boost_INCLUDE_DIR} ${OPENSSL_INCLUDE_DIR}
                        ${CONFIG_INCLUDE_DIR} ${REST_INCLUDE_DIR} ${CZI_IMAGE_INCLUDE_DIR}
                        ${MYSQLCONN_INCLUDE_DIR} ${ZLIB_INCLUDE_DIR} ${PNG_INCLDE_DIR}
                        ${DB_INCLUDE_DIR} ${AUTH_INCLUDE_DIR}
        )

# display msg: header file path
message("\n")
message("-- INCLUDE DIR PATHS --")
message("-- PNG_INCLUDE: " "${PNG_INCLUDE_DIR}")
message("-- ADDITIONAL_LIBS_INCLUDE_DIR: " "${ADDITIONAL_LIBS_INCLUDE_DIR}")
message("-- MYSQLCONN_INCLUDE: " "${MYSQLCONN_INCLUDE_DIR}")
message("-- CZI_IMAGE_INCLUDE: " "${CZI_IMAGE_INCLUDE_DIR}")
message("-- REST_INCLUDE: " "${REST_INCLUDE_DIR}")
message("-- MYSQLCONN_INCLUDE: " "${MYSQLCONN_INCLUDE_DIR}")
message("-- DB_INCLUDE: " "${DB_INCLUDE_DIR}")
message("-- AUTH_INCLUDE: " "${AUTH_INCLUDE_DIR}")


# library search
if(APPLE)
    set(ZIP_LIBRARY "/usr/local/Cellar/zlib/1.2.11/lib/libz.dylib")
    set(MYSQLCONN_LIBS "/usr/local/Cellar/mysql-connector-c++/8.0.19/lib/libmysqlcppconn8.2.dylib")
    set( PNG_LIB "/usr/local/opt/libpng/lib/libpng.dylib")
    set(LIBRARIES_SEARCH_PATHS ${OPENSSL_LIBRARIES} ${Boost_LIBRARIES} ${ZIP_LIBRARY} ${MYSQLCONN_LIBS} ${PNG_LIB})
endif()

# display msg: libraries path
message("\n")
message("-- LIBS DIR PATHS --")
message("-- BOOST_LIBS: " "${Boost_LIBRARIES}")
message("-- MYSQLCONN_LIBS: " "${MYSQLCONN_LIBS}")
message("-- LIBRARIES_SEARCH_PATHS: " "${LIBRARIES_SEARCH_PATHS}")


include_directories(${HEADER_SEARCH_PATHS})

if (APPLE)
    target_link_libraries(${PROJECT_NAME} cpprestsdk::cpprest libCZI)
    target_link_libraries(${PROJECT_NAME} "-framework CoreFoundation")
    target_link_libraries(${PROJECT_NAME} "-framework Security")
    target_link_libraries(${PROJECT_NAME} ${LIBRARIES_SEARCH_PATHS})
    set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "-W1, -F/Library/Frameworks")
endif ()

if (Linux)
    set(LINUX_SEARCH_PATHS ${Boost_INCLUDE_DIR} ${OPENSSL_INCLUDE_DIR}
                        ${REST_INCLUDE_DIR} ${CZI_IMAGE_INCLUDE_DIR}
                        ${MYSQLCONN_INCLUDE_DIR} ${DB_INCLUDE_DIR}
                        ${AUTH_INCLUDE_DIR}
        )
    set(LIBRARIES_SEARCH_PATHS ${OPENSSL_LIBRARIES} ${Boost_LIBRARIES} ${ZIP_LIBRARY} ${MYSQLCONN_LIBS})
    include_directories(${LINUX_SEARCH_PATHS})
    target_link_libraries(${PROJECT_NAME} cpprestsdk::cpprest)
    target_link_libraries(${PROJECT_NAME} ${LIBRARIES_SEARCH_PATHS})
endif ()
