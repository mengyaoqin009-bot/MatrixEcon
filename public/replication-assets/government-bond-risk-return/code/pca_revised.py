print('It produces performance measures and principal components analysis for government bond returns in the US and China.')

import urllib.request, urllib.parse, urllib.error
import zipfile
import ssl
import matplotlib.pyplot as plt
import matplotlib.dates as mdate
import matplotlib as mpl
import numpy as np
import pandas as pd
import zipfile
import scipy.interpolate as interpl
import datetime
import xlrd
import xlwt
import csv
import os
import numpy as np
import requests
from pathlib import Path

#  BELOW IS THE FUNCTION TO TAKE THE END DATE
def gettime(datesplit):
    year = int(datesplit[0:4])
    month = int(datesplit[5:])
    return (year, month)

def setwidth(sheet):
    for i in range(0, len(column)):
        cwidth = sheet.col(i).width
        if (len(column[i]) * 256) > cwidth:
            sheet.col(i).width = len(column[i]) * 256


def grusa(years, start_year):
    if years == 'oneyr':
        seq = 4
    elif years == 'twoyrs':
        seq = 5
    elif years == 'threeyrs':
        seq = 6
    elif years == 'fiveyrs':
        seq = 7
    elif years == 'sevenyrs':
        seq = 8
    elif years == 'tenyrs':
        seq = 9
    else:
        seq = 4
        print('Your type name is wrong, automatically generate one year data...')

    for atom in ratedata:
        if (atom.find('ND,ND')) != -1:
            continue
        
        date = atom.split(',')[0]
        oneyr = atom.split(',')[seq]
        year = int(date.split('-')[0])
        month = int(date.split('-')[1])
        day = int(date.split('-')[2])
        tup = (year, month, day)
        if oneyr != "":
            ratedict[tup] = float(oneyr)
        else:
            ratedict[tup] = np.nan
        

    signyear = int(start_year[0:4])
    signmonth = int(start_year[5:])
    rdict = dict()
    while True:
        if signmonth == 13:
            signmonth = 1
            signyear = signyear + 1
        if (signyear, signmonth) == gettime(datesplit):
            break
        stryear = str(signyear)
        if signmonth >= 10:
            strmonth = str(signmonth)
        else:
            strmonth = '0' + str(signmonth)
        i = 31
        while True:
            sign = ratedict.get((signyear, signmonth, i), 0)
            if (sign == 0) & (i > 0):
                i = i - 1
                continue
            if i == 0:
                sign = np.nan
            break
        rdict[stryear + strmonth] = float(sign)
        signmonth = signmonth + 1
    return (rdict)


def grchn(years, start_year):
    if years == 'repo':
        seq = 1
    elif years == 'oneyr':
        seq = 2
    elif years == 'threeyrs':
        seq = 3
    elif years == 'fiveyrs':
        seq = 4
    elif years == 'sevenyrs':
        seq = 5
    elif years == 'tenyrs':
        seq = 6

    for atom in ratedata:
        if atom[0] == 'Name':
            continue
        if atom[0] == 'Frequency':
            continue
        date = atom[0]
        print(date)
        yr = atom[seq]
        year = int(date.split('/')[0])
        month = int(date.split('/')[1])
        day = int(date.split('/')[2])
        tup = (year, month, day)
        if yr == '':
            continue
        ratedict[tup] = float(yr)

    if years == 'repo':
        signyear = int(start_year[:4])
        signmonth = int(start_year[5:])
    else:
        signyear = int(start_year[:4])
        signmonth = int(start_year[5:])
    rdict = dict()
    while True:
        if signmonth == 13:
            signmonth = 1
            signyear = signyear + 1
        if (signyear, signmonth) == gettime(datesplit):
            break
        stryear = str(signyear)
        if signmonth >= 10:
            strmonth = str(signmonth)
        else:
            strmonth = '0' + str(signmonth)
        i = 31
        while True:
            sign = ratedict.get((signyear, signmonth, i), 0)
            if sign == 0:
                i = i - 1
                if i > 0:
                    continue
                else:
                    break
            break
        if i <= 0:
            break
        rdict[stryear + strmonth] = float(sign)
        signmonth = signmonth + 1
    return (rdict)


def writesheet1(fname='', lst=[], sheet=[]):
    column = ['Calendar Month (yyyymm)', name0]
    for atom in newmat:
        column.append('Maturity : ' + str(atom) + ' yr(s)')
    sheet.write(0, 0, column[0], style2)
    for i in range(1, len(column)):
        sheet.write(0, i, column[i], style1)
    j = 1
    for (time, array) in lst:
        csvlist = [time]
        for atom in array:
            csvlist.append(atom)
        for i in range(0, len(csvlist)):
            sheet.write(j, i, csvlist[i], style)
        j = j + 1
    for i in range(0, len(column)):
        cwidth = sheet.col(i).width
        if (len(column[i]) * 256) > cwidth:
            sheet.col(i).width = len(column[i]) * 256


def writesheet2(fname='', lst=[], sheet=[]):
    j = 0
    for atom in lst:
        newlist = list()
        newlist.append(atom[0])
        for item in atom[1]:
            newlist.append(item)
        for i in range(0, len(newlist)):
            sheet.write(j, i, newlist[i], style)
        j = j + 1


def var(list):
    mean = sum(list) / len(list)
    variance = 0
    for item in list:
        variance = variance + (item - mean) ** 2
    return (variance / (len(list) - 1))


def stat(year):
    if ques == 'Bond':
        excess_return_list = list()
        raw_return_list = list()
        for key, rfrate, new_zero_list in new_zero:
            if key != boss:
                psell = new_zero_list[year * 12 - 2]
                retu = (((psell / pbuy) - 1) - (rfrate / 100)) * 100
                rawretu = ((psell / pbuy) - 1) * 100
                pbuy = new_zero_list[year * 12 - 1]

                excess_return_list.append(retu)
                raw_return_list.append(rawretu)
            else:
                pbuy = new_zero_list[year * 12 - 1]

        mean_raw_return = 12 * (sum(raw_return_list) / len(raw_return_list))
        mean_excess_return = 12 * (sum(excess_return_list) / len(excess_return_list))
        excess_return_variance = 12 * var(excess_return_list)
        excess_return_volatility = excess_return_variance ** 0.5
        sharpe_ratio = mean_excess_return / excess_return_volatility
        ans = [year, mean_raw_return, mean_excess_return, excess_return_volatility, sharpe_ratio,
               excess_return_variance]
    elif ques == 'ETF':
        excess_return_list = list()
        raw_return_list = list()
        excess_return_list = [SHV, SHY, IEI, IEF, TLH, TLT][year]
        for i in range(len(rflist)):
            raw_return_list.append(float(rflist[i]) + float([SHV, SHY, IEI, IEF, TLH, TLT][year][i]))
        mean_raw_return = 12 * (sum(raw_return_list) / len(raw_return_list))
        mean_excess_return = 12 * (sum(excess_return_list) / len(excess_return_list))
        excess_return_variance = 12 * var(excess_return_list)
        excess_return_volatility = excess_return_variance ** 0.5
        sharpe_ratio = mean_excess_return / excess_return_volatility
        ans = [year + 1, mean_raw_return, mean_excess_return, excess_return_volatility, sharpe_ratio,
               excess_return_variance]
    return ([ans])


def exlist(year):
    if ques == 'Bond':
        excess_return_list = list()
        raw_return_list = list()
        for key, rfrate, new_zero_list in new_zero:
            if key != boss:
                psell = new_zero_list[year * 12 - 2]
                # pbuy = new_zero_list[year * 12 - 1]
                retu = (((psell / pbuy) - 1) - (rfrate / 100)) * 100
                rawretu = ((psell / pbuy) - 1) * 100
                pbuy = new_zero_list[year * 12 - 1]

                excess_return_list.append(retu)
                raw_return_list.append(rawretu)
            else:
                pbuy = new_zero_list[year * 12 - 1]
    elif ques == 'ETF':
        excess_return_list = list()
        excess_return_list = [SHV, SHY, IEI, IEF, TLH, TLT][year]
    return (excess_return_list)


def rawlist(year):
    if ques == 'Bond':
        excess_return_list = list()
        raw_return_list = list()
        for key, rfrate, new_zero_list in new_zero:
            if key != boss:
                psell = new_zero_list[year * 12 - 2]
                # pbuy = new_zero_list[year * 12 - 1]
                retu = (((psell / pbuy) - 1) - (rfrate / 100)) * 100
                rawretu = ((psell / pbuy) - 1) * 100
                pbuy = new_zero_list[year * 12 - 1]

                excess_return_list.append(retu)
                raw_return_list.append(rawretu)
            else:
                pbuy = new_zero_list[year * 12 - 1]
    elif ques == 'ETF':
        raw_return_list = list()
        for i in range(len(rflist)):
            raw_return_list.append(float(rflist[i]) + float([SHV, SHY, IEI, IEF, TLH, TLT][year][i]))
    return (raw_return_list)


def pca(matrix=[], return_list=[], n=10, fname='', sheet1=[]):
    eig_val, eig_vec = np.linalg.eig(matrix)
    eig_pairs = [(np.abs(12 * eig_val[i]), eig_vec[i]) for i in range(len(eig_val))]
    eigveclist = list()
    for j in range(len(eig_val)):
        eigvec = list()
        for i in range(len(eig_val)):
            eigvec.append(eig_vec[i][j])
        eigveclist.append(eigvec)
    eig_pairsraw = [(np.abs(12 * eig_val[i]), eigveclist[i]) for i in range(len(eig_val))]
    eig_pairsraw.sort(reverse=True)
    eig0vec = list()
    for (a, b) in eig_pairsraw:
        eig0vec.append(b)
    eig_vecNEW = list()
    for i in range(len(eig_val)):
        eigvec = list()
        for j in range(len(eig_val)):
            eigvec.append(eig0vec[j][i])
        eig_vecNEW.append(eigvec)
    eig_val = list()
    for (a, b) in eig_pairsraw:
        eig_val.append(a)
    eig_pairs = [(eig_val[i], eig_vecNEW[i]) for i in range(len(eig_val))]
    eig_anval = ['Factor variance (ann., in bps)']
    for (a, b) in eig_pairs:
        eig_anval.append(a)
    eig_raw_anval = list()
    for (a, b) in eig_pairs:
        eig_raw_anval.append(a)
    percent_list = ['Percentage of total']
    for item in eig_raw_anval:
        perc = item / sum(eig_raw_anval)
        percent_list.append(perc)
    data = np.dot(np.transpose(eig_vecNEW), return_list)
    mean_list = list()
    for line in data:
        mean = np.mean(line)
        mean_list.append(mean)
    sharp_list = ['Factor Sharpe Ratio (ann.)']
    sign = list()
    for i in range(n):
        rawuna_sharp = ((eig_val[i] / 12) ** (-0.5)) * mean_list[i]
        una_sharp = np.abs(((eig_val[i] / 12) ** (-0.5)) * mean_list[i])
        sign.append(rawuna_sharp / una_sharp)
        sharp = (12 ** (0.5)) * una_sharp
        sharp_list.append(sharp)
    vol_list = ['Factor vol (ann., in %)']
    for item in eig_raw_anval:
        vol_list.append(item ** (0.5))
    excess_list = ['Factor excess return (ann., in %)']
    for i in range(1, n + 1):
        excess = vol_list[i] * sharp_list[i]
        excess_list.append(excess)

    column = list()
    for i in range(1, n + 1):
        column.append('Factor ' + str(i))
    for i in range(0, len(column)):
        sheet1.write(0, i + 1, column[i], style1)
    sheet1.write(1, 0, eig_anval[0], style3)
    for i in range(1, len(eig_anval)):
        sheet1.write(1, i, eig_anval[i], style)
    sheet1.write(2, 0, percent_list[0], style3)
    for i in range(1, len(percent_list)):
        sheet1.write(2, i, percent_list[i], style6)
    sheet1.write(3, 0, vol_list[0], style3)
    for i in range(1, len(vol_list)):
        sheet1.write(3, i, vol_list[i], style)
    sheet1.write(4, 0, excess_list[0], style3)
    for i in range(1, len(excess_list)):
        sheet1.write(4, i, excess_list[i], style)
    sheet1.write(5, 0, sharp_list[0], style3)
    for i in range(1, len(sharp_list)):
        sheet1.write(5, i, sharp_list[i], style)
    j = 6
    proxy = 1
    for (a, b) in eig_pairs:
        proline = [str(proxy) + '-year zero loadings']
        proxy = proxy + 1
        cool = 0
        for item in b:
            proline.append(sign[cool] * item)
            cool = cool + 1
        sheet1.write(j, 0, proline[0], style3)
        for i in range(1, len(proline)):
            sheet1.write(j, i, proline[i], style4)
        j = j + 1
    if ques == 'ETF':
        line = ['0-1 year UST ETF loadings', '1-3 year UST ETF loadings', '3-7 year UST ETF loadings',
                '7-10 year UST ETF loadings', '10-20 year UST ETF loadings', '20+ year UST ETF loadings']
        for i in range(0, len(line)):
            sheet1.write(i + 6, 0, line[i], style3)
        sheet1.write(12, 7, 'Q matrix: Its columns are eigenvectors.', style)
    elif ques == 'Bond':
        if n != 10:
            if country == 'USA':
                line = ['1-year zero loadings', '2-year zero loadings', '3-year zero loadings', '5-year zero loadings',
                        '7-year zero loadings', '10-year zero loadings']
                sheet1.write(12, 7, 'Q matrix: Its columns are eigenvectors.', style)
            elif country == 'CHN':
                line = ['1-year zero loadings', '3-year zero loadings', '5-year zero loadings', '7-year zero loadings',
                        '10-year zero loadings']
                sheet1.write(11, 6, 'Q matrix: Its columns are eigenvectors.', style)
            for i in range(0, len(line)):
                sheet1.write(i + 6, 0, line[i], style3)
        else:
            sheet1.write(16, 11, 'Q matrix: Its columns are eigenvectors.', style)
    for i in range(0, len(column)):
        cwidth = sheet1.col(i).width
        if (len(column[i]) * 256) > cwidth:
            sheet1.col(i).width = len(column[i]) * 256
    cwidth = sheet1.col(0).width
    if (len(excess_list[0]) * 256) > cwidth:
        sheet1.col(0).width = len(excess_list[0]) * 256

current_dir = Path(__file__).parent
rfpath = current_dir / "F-F_Research_Data_Factors_CSV.zip"
ratepath = current_dir / "FRB_H15.csv"
etfpath = current_dir / "Treas ETF returns.xls"
chnpath = current_dir / "China_data.csv"

ques = input("Please type Bond or ETF:")
country = input("Please type USA or CHN：")
start_year = input("Enter the start date in format'YYYY-MM': ")
datesplit = input("Enter the end date in format'YYYY-MM': ")


if ques == 'Bond':
    if country == 'USA':
        # boss = '197606'
        boss = start_year[0:4] + start_year[5:]
        name0 = 'Processed 1-month par rate'
    elif country == 'CHN':
        # boss = '200404'
        boss = start_year[0:4] + start_year[5:]

        name0 = 'Processed 1 day repo rate'

# End of definition, start of codes
if ques == 'ETF':
    data = xlrd.open_workbook(etfpath)
    table = data.sheets()[0]
    SHVraw = table.col_values(1)[2:]
    SHV = list()
    for item in SHVraw:
        SHV.append(item * 100)
    SHYraw = table.col_values(2)[2:]
    SHY = list()
    for item in SHYraw:
        SHY.append(item * 100)
    IEIraw = table.col_values(3)[2:]
    IEI = list()
    for item in IEIraw:
        IEI.append(item * 100)
    IEFraw = table.col_values(4)[2:]
    IEF = list()
    for item in IEFraw:
        IEF.append(item * 100)
    TLHraw = table.col_values(5)[2:]
    TLH = list()
    for item in TLHraw:
        TLH.append(item * 100)
    TLTraw = table.col_values(6)[2:]
    TLT = list()
    for item in TLTraw:
        TLT.append(item * 100)
    # newzip = zipfile.ZipFile('rf.zip', 'w')

    # rfurl = 'http://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_Factors_CSV.zip'
    # rfzip = urllib.request.urlopen(rfurl)
    # rfwebdata = rfzip.read()
    # with open('rf.zip', 'wb') as zip:
    #     zip.write(rfwebdata)

    # with zipfile.ZipFile('rf.zip', 'r') as readzip:
    #     rfdata = readzip.read(readzip.namelist()[0]).decode()

    with zipfile.ZipFile(rfpath, 'r') as readzip:
            rfdata = readzip.read(readzip.namelist()[0]).decode()

    rfdata = rfdata.split('Annual')[0]
    rfdata = rfdata.split('HML')[1]
    rfdata = rfdata.strip()
    rfdata = rfdata.split('\r\n')
    rflist = list()
    for atom in rfdata:
        atom = atom.split(',')
        if len(atom) < 3:
            continue
        if int(atom[0]) > 200701:
            rflist.append(atom[4].strip())
        if int(atom[0]) >= 201912:
            break

    wb = xlwt.Workbook()
    style1 = xlwt.XFStyle()
    font = xlwt.Font()
    font.bold = True
    borders = xlwt.Borders()
    borders.bottom = xlwt.Borders.THIN
    style1.font = font
    style1.borders = borders
    style2 = xlwt.XFStyle()
    style2.font = font
    style2.borders = borders
    alignment = xlwt.Alignment()
    alignment.horz = xlwt.Alignment.HORZ_RIGHT
    style1.alignment = alignment
    style3 = xlwt.XFStyle()
    style3.font = font
    style4 = xlwt.XFStyle()
    pattern = xlwt.Pattern()
    pattern.pattern = xlwt.Pattern.SOLID_PATTERN
    pattern.pattern_fore_colour = 0x16
    style4.pattern = pattern
    style4.num_format_str = '0.00'
    style = xlwt.XFStyle()
    style.num_format_str = '0.00'
    style5 = xlwt.XFStyle()
    style5.num_format_str = '0.000000'
    style6 = xlwt.XFStyle()
    style6.num_format_str = '0.00%'
    style7 = xlwt.XFStyle()
    alignment = xlwt.Alignment()
    alignment.horz = xlwt.Alignment.HORZ_LEFT
    style7.alignment = alignment
    style7.font = font
    style7.borders = borders
    sheet1 = wb.add_sheet('6x6 corr PCA', cell_overwrite_ok=True)
    sheet2 = wb.add_sheet('6x6 cov PCA', cell_overwrite_ok=True)
    sheet3 = wb.add_sheet('Correlation matrix', cell_overwrite_ok=True)
    sheet4 = wb.add_sheet('Covariance matrix', cell_overwrite_ok=True)
    sheet5 = wb.add_sheet('Performance measures', cell_overwrite_ok=True)
    sheet6 = wb.add_sheet('Excess ETF returns in %', cell_overwrite_ok=True)
    sheet7 = wb.add_sheet('Raw ETF returns in %', cell_overwrite_ok=True)

    stat_list = list()
    matrix_list = list()
    return_list = list()
    new_return_list = list()
    mean_list = list()
    new_matrix_list = list()

    for i in [0, 1, 2, 3, 4, 5]:
        stat_list.append(stat(i)[0])
        np_array = np.array(exlist(i))
        return_list.append(np_array)
        new_return_list.append(np_array / (stat(i)[0][3] / (12 ** 0.5)))
        np_mean = np.mean(np_array)
        mean_list.append(np_mean)
        np_scaled = np_array - np_mean
        matrix_list.append(np_scaled)
        new_matrix_list.append(np_scaled / (stat(i)[0][3] / (12 ** 0.5)))

    column = ['0-1 year ETF', '1-3 year ETF', '3-7 year ETF', '7-10 year ETF', '10-20 year ETF', '20+ year ETF']
    for i in range(0, len(column)):
        sheet7.write(0, i, column[i], style1)
    j = 0
    for i in [0, 1, 2, 3, 4, 5]:
        for k in range(0, len(rawlist(i))):
            sheet7.write(k + 1, j, rawlist(i)[k], style)
        j = j + 1
    setwidth(sheet7)

    column = ['0-1 year ETF', '1-3 year ETF', '3-7 year ETF', '7-10 year ETF', '10-20 year ETF', '20+ year ETF']
    for i in range(0, len(column)):
        sheet6.write(0, i, column[i], style1)
    j = 0
    for i in [0, 1, 2, 3, 4, 5]:
        for k in range(0, len(exlist(i))):
            sheet6.write(k + 1, j, exlist(i)[k], style)
        j = j + 1
    setwidth(sheet6)

    sheet5.write(0, 0, 'All quantities are annualized')
    column = ['Type of ETF', 'Mean raw return in %', 'Mean excess return in %', 'Excess return volatility in %',
              'Sharpe Ratio', 'Excess return variance in bps']
    sheet5.write(2, 0, column[0], style7)
    for i in range(1, len(column)):
        sheet5.write(2, i, column[i], style1)
    j = 3
    k = 0
    columnn = ['0-1 year ETF', '1-3 year ETF', '3-7 year ETF', '7-10 year ETF', '10-20 year ETF', '20+ year ETF']
    for items in stat_list:
        sheet5.write(j, 0, columnn[k])
        for i in range(1, len(items)):
            sheet5.write(j, i, items[i], style)
        j = j + 1
        k = k + 1
    setwidth(sheet5)
    cwidth = sheet5.col(0).width
    if (len(columnn[4]) * 256) > cwidth:
        sheet5.col(0).width = len(columnn[4]) * 256

    cov_matrix = np.cov(matrix_list, rowvar=True)
    sheet4.write(0, 0, 'Covariances of excess monthly returns (bps)')
    j = 2
    for items in cov_matrix:
        for i in range(0, len(items)):
            sheet4.write(j, i, items[i], style)
        j = j + 1
    sheet4.write(13, 0, 'Covariances of annual excess monthly returns (bps)')
    j = 15
    for items in cov_matrix:
        for i in range(0, len(items)):
            sheet4.write(j, i, items[i] * 12, style)
        j = j + 1

    cor_matrix = np.cov(new_matrix_list, rowvar=True)
    j = 0
    for items in cor_matrix:
        for i in range(0, len(items)):
            sheet3.write(j, i, items[i], style)
        j = j + 1

    pca(cov_matrix, return_list, 6, '6x6covPCA', sheet2)
    pca(cor_matrix, new_return_list, 6, '6x6corPCA', sheet1)

    wb.save('PCA-UST ETF.xls')
    print("The process for ETF-USA is finished.")

elif ques == 'Bond':
    if country == 'USA':

        # newzip = zipfile.ZipFile('rf.zip', 'w')

        # rfurl = 'http://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_Factors_CSV.zip'
        # rfzip = urllib.request.urlopen(rfurl)
        # rfwebdata = rfzip.read()
        # with open('rf.zip', 'wb') as zip:
        #     zip.write(rfwebdata)
            
        # with zipfile.ZipFile('rf.zip', 'r') as readzip:
        #     rfdata = readzip.read(readzip.namelist()[0]).decode()
        
        with zipfile.ZipFile(rfpath, 'r') as readzip:
            rfdata = readzip.read(readzip.namelist()[0]).decode()
            
        rfdata = rfdata.split('Annual')[0]
        rfdata = rfdata.split('HML')[1]
        rfdata = rfdata.strip()
        rfdata = rfdata.split('\r\n')
        rfdict = dict()
        for atom in rfdata:
            atom = atom.split(',')
            if len(atom) < 3:
                continue
            rfdict[atom[0].strip()] = float(atom[4].strip())

        #rateurl = 'https://www.federalreserve.gov/datadownload/Output.aspx?rel=H15&series=bf17364827e38702b42a58cf8eaa3f78&lastobs=&from=&to=&filetype=csv&label=include&layout=seriescolumn&type=package'
        #ratedata = requests.get(rateurl).text
        #ratedata = ratedata.split('"RIFLGFCY30_N.B"\r\n')[1]
        #ratedata = ratedata.strip().split('\r\n')

        df = pd.read_csv(ratepath, skiprows = 5)
        df = df.rename(columns = {'Time Period': 'Date'})
        df = df.fillna('')
        ratedata = []
        for _, row in df.iterrows():
            values = [str(row['Date'])] + [str(row[col]) for col in df.columns[1:]]
            row_str = ','.join(values) + ','
            ratedata.append(row_str)
        
        ratedict = dict()
        onedict = grusa('oneyr', start_year)
        twodict = grusa('twoyrs', start_year)
        threedict = grusa('threeyrs', start_year)
        fivedict = grusa('fiveyrs', start_year)
        sevendict = grusa('sevenyrs', start_year)
        tendict = grusa('tenyrs', start_year)
    elif country == 'CHN':
        ratedata = csv.reader(open(chnpath, 'r'))
        ratedict = dict()
        onedict = grchn('oneyr', start_year)
        ratedata = csv.reader(open(chnpath, 'r'))
        ratedict = dict()
        threedict = grchn('threeyrs', start_year)
        ratedata = csv.reader(open(chnpath, 'r'))
        ratedict = dict()
        fivedict = grchn('fiveyrs', start_year)
        ratedata = csv.reader(open(chnpath, 'r'))
        ratedict = dict()
        sevendict = grchn('sevenyrs', start_year)
        ratedata = csv.reader(open(chnpath, 'r'))
        ratedict = dict()
        tendict = grchn('tenyrs', start_year)
        ratedata = csv.reader(open(chnpath, 'r'))
        ratedict = dict()
        rfdict = grchn('repo', start_year)
    else:
        print('Wrong Country!')
        quit()

    if country == 'USA':
        box = ((rfdict, 'USA Risk Free Rate'), (onedict, 'One Year to Maturity USA Govt Bonds Par Rate'),
               (twodict, 'Two Years to Maturity USA Govt Bonds Par Rate'),
               (threedict, 'Three Years to Maturity USA Govt Bonds Par Rate'),
               (fivedict, 'Five Years to Maturity USA Govt Bonds Par Rate'),
               (sevendict, 'Seven Years to Maturity USA Govt Bonds Par Rate'),
               (tendict, 'Ten Years to Maturity USA Govt Bonds Par Rate'))
    elif country == 'CHN':
        box = ((rfdict, 'CHN Risk Free Rate'), (onedict, 'One Year to Maturity CHN Govt Bonds Par Rate'),
               (threedict, 'Three Years to Maturity CHN Govt Bonds Par Rate'),
               (fivedict, 'Five Years to Maturity CHN Govt Bonds Par Rate'),
               (sevendict, 'Seven Years to Maturity CHN Govt Bonds Par Rate'),
               (tendict, 'Ten Years to Maturity CHN Govt Bonds Par Rate'))
    for dic, string in box:
        pic1 = plt.figure(1, figsize=(20, 10))
        plt.title('Time Series of ' + string)
        plt.xlabel('Dates')
        plt.ylabel(string)
        x = []
        y = []
        for key, val in dic.items():
            timeformat = datetime.datetime.strptime(key, '%Y%m')
            x.append(timeformat)
            y.append(val)
        plt.plot_date(x, y, 'r.')
        plt.savefig(string + '.png', dpi=pic1.dpi)
        plt.close()

    tsraw = dict()
    for key, val in rfdict.items():
        if country == 'USA':
            tsraw[key] = [2 * (((1 + (val / 100)) ** 6) - 1) * 100]
        elif country == 'CHN':
            tsraw[key] = [2 * (((1 + (val / 36500)) ** 182.5) - 1) * 100]
    if country == 'USA':
        dicts = (onedict, twodict, threedict, fivedict, sevendict, tendict)
    elif country == 'CHN':
        dicts = (onedict, threedict, fivedict, sevendict, tendict)
    for dic in dicts:
        for key, val in dic.items():
            if key in tsraw:
                tsraw[key].append(val)
            else:
                tsraw[key] = [val]

    termstructure = dict()
    if country == 'USA':
        border = 7
    elif country == 'CHN':
        border = 6
    for key, val in tsraw.items():
        if len(val) != border:
            continue
        termstructure[key] = val

    demolist = list()
    listinlist = list()
    for key, valu in termstructure.items():
        for date, val in rfdict.items():
            if date == key:
                listinlist.append(date)
                listinlist.append(val)
        listinlist.append(valu)
        demolist.append(listinlist)
        listinlist = list()

    wb = xlwt.Workbook()
    style = xlwt.XFStyle()
    style.num_format_str = '0.00'
    style1 = xlwt.XFStyle()
    font = xlwt.Font()
    font.bold = True
    borders = xlwt.Borders()
    borders.bottom = xlwt.Borders.THIN
    style1.font = font
    style1.borders = borders
    style2 = xlwt.XFStyle()
    style2.font = font
    style2.borders = borders
    alignment = xlwt.Alignment()
    alignment.horz = xlwt.Alignment.HORZ_RIGHT
    style1.alignment = alignment
    style3 = xlwt.XFStyle()
    style3.font = font
    style4 = xlwt.XFStyle()
    pattern = xlwt.Pattern()
    pattern.pattern = xlwt.Pattern.SOLID_PATTERN
    pattern.pattern_fore_colour = 0x16
    style4.pattern = pattern
    style4.num_format_str = '0.00'
    style5 = xlwt.XFStyle()
    style5.num_format_str = '0.000000'
    style6 = xlwt.XFStyle()
    style6.num_format_str = '0.00%'
    if country == 'USA':
        namea = '6x6 corr PCA'
        nameb = '6x6 cov PCA'
        namec = 'Original monthly risk free rate'
        named = 'Processed risk free rate'
        width = 6
    elif country == 'CHN':
        namea = '5x5 corr PCA'
        nameb = '5x5 cov PCA'
        namec = '1 day repo'
        named = 'Processed 1 day repo'
        width = 5
    sheet1 = wb.add_sheet(namea, cell_overwrite_ok=True)
    sheet2 = wb.add_sheet(nameb, cell_overwrite_ok=True)
    sheet3 = wb.add_sheet('10x10 corr PCA', cell_overwrite_ok=True)
    sheet4 = wb.add_sheet('10x10 cov PCA', cell_overwrite_ok=True)
    sheet5 = wb.add_sheet('Correlation matrix', cell_overwrite_ok=True)
    sheet6 = wb.add_sheet('Covariance matrix', cell_overwrite_ok=True)
    sheet7 = wb.add_sheet('Performance measures', cell_overwrite_ok=True)
    sheet8 = wb.add_sheet('Excess zero returns in %', cell_overwrite_ok=True)
    sheet9 = wb.add_sheet('Raw zero returns in %', cell_overwrite_ok=True)
    sheet10 = wb.add_sheet('Splined zero prices', cell_overwrite_ok=True)
    sheet11 = wb.add_sheet('Splined zero rates in %', cell_overwrite_ok=True)
    sheet12 = wb.add_sheet('Prespline zero rates in %', cell_overwrite_ok=True)
    sheet13 = wb.add_sheet('Splined par rates in %', cell_overwrite_ok=True)
    sheet14 = wb.add_sheet('rfrate, par rates, semi-an in %', cell_overwrite_ok=True)

    if country == 'USA':
        column = ['Year', namec, named, '1-yr par rate', '2-yr par rate', '3-yr par rate', '5-yr par rate',
                  '7-yr par rate', '10-yr par rate']
    elif country == 'CHN':
        column = ['Year', namec, named, '1-yr par rate', '3-yr par rate', '5-yr par rate', '7-yr par rate',
                  '10-yr par rate']
    sheet14.write(0, 0, column[0], style2)
    for i in range(1, len(column)):
        sheet14.write(0, i, column[i], style1)
    j = 1
    for (date, rfrate, olist) in demolist:
        csvlist = list()
        csvlist.append(date)
        csvlist.append(rfrate)
        for item in olist:
            csvlist.append(item)
        for i in range(0, len(csvlist)):
            sheet14.write(j, i, csvlist[i], style)
        j = j + 1
    setwidth(sheet14)

    tslist = list()
    manilist = list()
    for key, val in termstructure.items():
        if country == 'USA':
            mat = [1 / 12, 1, 2, 3, 5, 7, 10]
            manifest = [1 / 12, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
            newmat = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
            set = [1, 2, 3, 5, 7, 10]
        elif country == 'CHN':
            mat = [0, 1, 3, 5, 7, 10]
            manifest = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
            newmat = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
            set = [1, 3, 5, 7, 10]
        interpl_output = interpl.PchipInterpolator(mat, termstructure[key])
        onemonth = interpl_output([1 / 12])
        newrate = interpl_output(newmat)
        manifestrate = interpl_output(manifest)
        manilist.append((key, manifestrate))
        tslist.append((key, onemonth, newrate))

    writesheet1('Splined_par_rates', manilist, sheet13)

    zero = list()
    for key, onemonth, newrate in tslist:
        zero_list = list()
        for par in newrate:
            zeroprice = (1 - ((par / 200) * sum(zero_list))) / (1 + par / 200)
            zero_list.append(zeroprice)
        zero.append((key, onemonth, zero_list))

    zero_rate = list()
    for key, onemonth, zero_list in zero:
        zero_rate_list = list()
        i = 0.5
        for item in zero_list:
            rate = 2 * (((1 / item) ** (1 / (2 * i))) - 1)
            zero_rate_list.append(rate)
            i = i + 0.5
        new_zero_rate_list = list()
        new_zero_rate_list.append(onemonth[0] / 100)
        for atom in zero_rate_list:
            new_zero_rate_list.append(atom)
        zero_rate.append((key, new_zero_rate_list))
    demo_zero_rate = list()
    for key, new_zero_rate_list in zero_rate:
        demo = list()
        for item in new_zero_rate_list:
            demo.append(item * 100)
        demo_zero_rate.append((key, demo))
    writesheet1('Prespline_zero_rates', demo_zero_rate, sheet12)

    new_zero_rate = list()
    for key, new_zero_rate_list in zero_rate:
        mat = [1 / 12, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
        interpl_output = interpl.PchipInterpolator(mat, new_zero_rate_list)
        newmat = list()
        i = 1 / 12
        while True:
            newmat.append(i)
            i = i + 1 / 12
            if i > 121 / 12:
                break
            else:
                continue
        newrate = interpl_output(newmat)
        new_zero_rate.append((key, newrate))
    demo_new_zero_rate = list()
    for key, newrate in new_zero_rate:
        demo = list()
        for item in newrate:
            demo.append(item * 100)
        demo_new_zero_rate.append((key, demo))
    writesheet2('Splined_zero_rates', demo_new_zero_rate, sheet11)

    new_zero = list()
    for key, newrate in new_zero_rate:
        new_zero_list = list()
        i = 1 / 12
        for item in newrate:
            zero = 1 / ((1 + (item / 2)) ** (2 * i))
            new_zero_list.append(zero)
            i = i + 1 / 12
        for date, val in termstructure.items():
            if date == key:
                rfrate = ((((val[0] / 200) + 1) ** (1 / 6)) - 1) * 100
                break
            else:
                continue
        new_zero.append((key, rfrate, new_zero_list))
    j = 0
    for atom in new_zero:
        newlist = list()
        newlist.append(atom[0])
        for item in atom[2]:
            newlist.append(item)
        for i in range(0, len(newlist)):
            sheet10.write(j, i, newlist[i], style5)
        j = j + 1

    stat_list = list()
    matrix_list = list()
    return_list = list()
    new_return_list = list()
    mean_list = list()
    new_matrix_list = list()

    for i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:
        stat_list.append(stat(i)[0])
        np_array = np.array(exlist(i))
        return_list.append(np_array)
        new_return_list.append(np_array / (stat(i)[0][3] / (12 ** 0.5)))
        np_mean = np.mean(np_array)
        mean_list.append(np_mean)
        np_scaled = np_array - np_mean
        matrix_list.append(np_scaled)
        new_matrix_list.append(np_scaled / (stat(i)[0][3] / (12 ** 0.5)))

    column = ['1-yr zero', '2-yr zero', '3-yr zero', '4-yr zero', '5-yr zero', '6-yr zero', '7-yr zero', '8-yr zero',
              '9-yr zero', '10-yr zero', 'Date']
    for i in range(0, len(column)):
        sheet9.write(0, i, column[i], style1)
    j = 0
    for i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:
        for k in range(0, len(rawlist(i))):
            sheet9.write(k + 1, j, rawlist(i)[k], style)
        j = j + 1

    column = ['1-yr zero', '2-yr zero', '3-yr zero', '4-yr zero', '5-yr zero', '6-yr zero', '7-yr zero', '8-yr zero',
              '9-yr zero', '10-yr zero', 'Date']
    for i in range(0, len(column)):
        sheet8.write(0, i, column[i], style1)
    j = 0
    for i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:
        for k in range(0, len(exlist(i))):
            sheet8.write(k + 1, j, exlist(i)[k], style)
        j = j + 1
    dates = list(termstructure.keys())
    for i in range(1, len(dates)):
        date = dates[i]
        sheet8.write(i, 10, date, style)
        sheet9.write(i, 10, date, style)

    sheet7.write(0, 0, 'All quantities are annualized')
    column = ['Zero maturity', 'Mean raw return in %', 'Mean excess return in %', 'Excess return volatility in %',
              'Sharpe Ratio', 'Excess return variance in bps']
    for i in range(0, len(column)):
        sheet7.write(2, i, column[i], style1)
    j = 3
    for items in stat_list:
        sheet7.write(j, 0, items[0])
        for i in range(1, len(items)):
            sheet7.write(j, i, items[i], style)
        j = j + 1
    setwidth(sheet7)

    cov_matrix = np.cov(matrix_list, rowvar=True)
    sheet6.write(0, 0, 'Covariances of excess monthly returns (bps)')
    j = 2
    for items in cov_matrix:
        for i in range(0, len(items)):
            sheet6.write(j, i, items[i], style)
        j = j + 1
    sheet6.write(13, 0, 'Covariances of annual excess monthly returns (bps)')
    j = 15
    for items in cov_matrix:
        for i in range(0, len(items)):
            sheet6.write(j, i, items[i] * 12, style)
        j = j + 1

    cor_matrix = np.cov(new_matrix_list, rowvar=True)
    j = 0
    for items in cor_matrix:
        for i in range(0, len(items)):
            sheet5.write(j, i, items[i], style)
        j = j + 1

    pca(cov_matrix, return_list, 10, '10x10covPCA', sheet4)
    pca(cor_matrix, new_return_list, 10, '10x10corPCA', sheet3)

    stat_list = list()
    matrix_list = list()
    return_list = list()
    new_return_list = list()
    mean_list = list()
    new_matrix_list = list()

    for i in set:
        stat_list.append(stat(i)[0])
        np_array = np.array(exlist(i))
        return_list.append(np_array)
        new_return_list.append(np_array / (stat(i)[0][3] / (12 ** 0.5)))
        np_mean = np.mean(np_array)
        mean_list.append(np_mean)
        np_scaled = np_array - np_mean
        matrix_list.append(np_scaled)
        new_matrix_list.append(np_scaled / (stat(i)[0][3] / (12 ** 0.5)))

    cov_matrix = np.cov(matrix_list, rowvar=True)
    cor_matrix = np.cov(new_matrix_list, rowvar=True)

    pca(cov_matrix, return_list, width, namea, sheet2)
    pca(cor_matrix, new_return_list, width, nameb, sheet1)

    if country == 'USA':
        wb.save('PCA_USA_{}'.format(start_year[:4])+'{}'.format(start_year[5:])+'_to_{}'.format(datesplit[:4])+'{}'.format(datesplit[5:])+'.xls')
        print("The process for Bond-USA is finished.")
    elif country == 'CHN':
        wb.save('PCA_CHN_{}'.format(start_year[:4])+'{}'.format(start_year[5:])+'_to_{}'.format(datesplit[:4])+'{}'.format(datesplit[5:])+'.xls')
        print("The process for Bond-CHN is finished.")

print('')
print('The analysis is complete.  Please see your local directory for the output files.')
