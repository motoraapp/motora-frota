# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 22:48:34. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (10511 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- PAINEL DO MOTORISTA -->
244: #secDriverPanel
246: <!-- Card do Veículo Vinculado -->
260: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
270: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
275: <!-- Aviso: nova versão do app Android -->
278: <!-- Aviso vermelho: notificações desligadas -->
281: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
285: <!-- Aviso de Pix / pagamento pendente -->
288: <!-- Navegação de Abas -->
306: <!-- Conteúdo das Abas Motorista -->
309: <!-- Aba CRLV-e -->
310: #tabDrvCrlv
315: <!-- Renderizado dinamicamente -->
319: <!-- Aba Contrato -->
320: #tabDrvContract
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Vistoria -->
335: #tabDrvInspection
342: <!-- Aba Pagamento -->
343: #tabDrvPayment
356: <!-- Caução e multas do motorista -->
358: <!-- Valor e descrição da cobrança -->
368: <!-- Seção Pix -->
382: <!-- QR Code Renderizado aqui -->
415: <!-- Seção Upload de Comprovante -->
432: <!-- Lista de comprovantes -->
437: <!-- Recibos quando o contrato está encerrado -->
444: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
445: #secMasterPanel
485: <!-- Aviso: falta criar a tabela dos termos no banco -->
488: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
490: <!-- Lista de Veículos -->
506: <!-- Renderizado via JS -->
513: <!-- Form de Adicionar Veículo -->
560: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO -->
608: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
614: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
619: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
624: <!-- Fichas Arquivadas (após marcar caução pago) -->
633: <!-- Form de Adicionar Motorista -->
728: <!-- Barra de baixo do dono (só no design novo) -->
739: <!-- MODAL PRIMEIRO LOGIN -->
740: #modalFirstLogin
774: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
775: #modalNotif
788: <!-- MODAL VISTORIA (MASTER) -->
789: #modalInspection
802: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
803: #modalSettings
936: <!-- MODAL TEMAS -->
937: #modalThemes
948: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
949: #modalCreds
964: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
979: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
980: #modalDriverFile
1022: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1026: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1055: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1070: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1112: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1113: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1114: #modalRecibo
1133: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1134: #modalPixArea
1150: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1151: #modalIA
1233: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1234: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1235: #modalEditVeh
1272: #modalSenha
1294: #modalMeusRecibos
1312: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1313: #modalEmail
1333: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1334: #modalReport
1349: #modalFinCardDetail
1362: #modalFinance
1395: <!-- FILTROS -->
1445: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1465: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1466: #modalExpenses
1501: <!-- MODAL NOVO PIX -->
1502: #modalNewPix
1554: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1612: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1613: #modalCorrigirRecibo
1627: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1628: #modalContractWizard
1644: <!-- Seleção Motorista & Veículo -->
1656: <!-- Locador -->
1677: <!-- Locatário -->
1698: <!-- Veículo -->
1721: <!-- Configuração Comercial -->
1762: <!-- Cláusulas editáveis -->
1774: <!-- Prévia -->
1788: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1789: #modalContractDetail
1802: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1803: #modalDocViewer
1811: #modalDocBody
1812: <!-- Conteúdo pré-visualizado -->
1818: #modalTerms
1832: <!-- NOTIFICAÇÕES TOAST -->
1849: lsGet()
1850: lsSet()
1851: lsDel()
1874: demoLoginRole()
1878: demoId()
1879: demoSave()
1880: demoSaved()
1882: *datas no horário de Brasília*
1883: demoLocal()
1884: demoParts()
1885: demoDay()
1886: demoNextDue()
1891: *dados fictícios (4 meses)*
1892: demoBuild()
2083: *documentos fictícios (imagem gerada na hora)*
2084: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2085: demoDocBlob()
2163: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2164: demoQuery()
2187: out()
2193: run()
2234: demoOnUpdate()
2244: demoOnInsert()
2350: demoClient()
2415: demoStart()
2423: demoStop()
2429: abrirDemo()
2436: trocarDemo()
2441: demoBanner()
2456: toEmail()
2460: showLogin()
2464: esc()
2469: dataHoraBR()
2477: uiDialogo()
2525: uiConfirm()
2534: uiPrompt()
2540: friendlyError()
2550: devicePrefs()
2553: saveDevicePrefs()
2556: docRef()
2557: viewDocIdx()
2559: setBusy()
2597: **TEMAS**
2606: currentTheme()
2611: applyTheme()
2612: openThemes()
2622: pickTheme()
2628: toggleDarkMode()
2630: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2632: loadDesignCfg()
2639: applyDesign()
2656: markMasterNav()
2663: fillDesignCfg()
2668: saveDesign()
2682: showToast()
2691: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2692: senhaErro()
2693: abrirSenha()
2702: salvarIaCodigo()
2712: fecharSenha()
2713: salvarSenha()
2734: loginUserInput()
2739: loginErro()
2743: verSenha()
2748: handleLogin()
2797: logout()
2816: saveFirstLoginPreferences()
2839: carregarDados()
2869: aplicarDados()
2908: loadAndRender()
2935: autoRefresh()
2974: markUpdated()
2979: reload()
2984: renderApp()
3032: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3035: masterBack()
3037: viewAsDriver()
3059: exitViewAs()
3078: viewOnly()
3079: renderViewAsBanner()
3089: showSection()
3094: withBtn()
3102: toggleDriverStatus()
3111: isOnline()
3113: updateStatusToggleUI()
3126: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3135: checkApkUpdate()
3150: updateInstallApkButton()
3170: renderDriverPanel()
3402: switchDriverTab()
3417: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3420: parsePixKey()
3424: normalizePixKey()
3432: pixKeyLooksOk()
3440: togglePixKeyFields()
3446: updatePixKeyPlaceholder()
3452: copyPixKey()
3459: copyPixCode()
3471: receiptBadge()
3481: receiptMasterBox()
3508: receiptAction()
3515: confirmReceipt()
3544: rejectReceipt()
3556: recheckReceipt()
3565: uploadReceipt()
3588: switchMasterTab()
3607: maskPhone()
3616: waLink()
3621: allVeh()
3622: allDrv()
3623: chargeVehicleId()
3635: enviarPedidoParcialAsaas()
3651: pedirPixParcial()
3669: restaurarPixTotal()
3675: responderPixParcial()
3699: contrato30Info()
3729: encerrarContrato()
3746: encerrarContratoPrompt()
3759: reativarContrato()
3783: marcarCaucaoPagoArquivar()
3804: desarquivarFicha()
3822: deliveryInspectionHtml()
3852: uploadDeliveryPhotos()
3879: delDeliveryPhoto()
3897: addCauDesconto()
3922: puxarMultaCaucao()
3943: delCauDesconto()
3965: dfCauDescontosHtml()
3998: dfContratoRender()
4042: encerrarContratoConfirmFicha()
4049: renderMasterPanel()
4213: renderArchivedDrivers()
4258: handleAddVehicle()
4298: deleteVehicle()
4299: cancelDeleteVehicle()
4301: confirmDeleteVehicle()
4325: abrirEditarVeiculo()
4347: evReadStoredCrlv()
4372: evReadChosenCrlv()
4388: fecharEditarVeiculo()
4389: salvarEditarVeiculo()
4426: drvCauMostra()
4433: drvCauLer()
4441: handleAddDriver()
4519: marcarSituacao()
4529: updateDriverPaymentStatus()
4538: deleteDriver()
4539: cancelDeleteDriver()
4541: confirmDeleteDriver()
4564: prepareFile()
4586: uploadFile()
4597: fileUrl()
4608: downloadName()
4612: renderFilePreview()
4632: renderPdfToCanvas()
4659: viewDoc()
4680: **DINHEIRO**
4681: parseMoney()
4688: fmtMoney()
4689: fmtDate()
4690: todayISO()
4692: **CONFIGURAÇÕES (Gemini e Google Drive)**
4694: loadConfigStatus()
4699: paintConfig()
4704: fillOwnerVehicleSelect()
4710: saveOwnerVehicle()
4732: locadorMerged()
4745: getLocadoresList()
4759: locadorForVehicle()
4768: fillLocadorSettings()
4788: cfgOnLocadorChange()
4789: upsertLocadorInList()
4819: deleteLocadorSetting()
4835: saveLocadorSettings()
4863: openSettings()
4878: closeSettings()
4879: saveConfig()
4889: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
4890: renderAsaasDrivers()
4917: toggleDriverAsaas()
4949: getAtrasoCfg()
4953: fillAtrasoCfg()
4960: saveAtrasoCfg()
4977: atrasoDataBR()
4982: atrasoPrazoUtil()
4989: calcEncargosAtraso()
5008: ehLinhaEncargo()
5009: calcAtrasoMotorista()
5039: atualizarPixAtraso()
5052: loadAsaasInfo()
5066: saveAsaas()
5074: testarAsaas()
5081: copiarAsaas()
5085: testDrive()
5092: resyncDrive()
5100: **FICHA DO MOTORISTA**
5103: openDriverFile()
5135: closeDriverFile()
5137: saveDriverFile()
5202: aiFillDriver()
5241: **CONTROLE FINANCEIRO**
5242: finRange()
5259: dayBR()
5260: inRange()
5262: onFinPeriodChange()
5268: fillFinFilters()
5276: clearFinFilters()
5280: updateFinFilterCount()
5289: openFinance()
5295: switchFinTab()
5306: finCardBtn()
5314: closeFinCardDetail()
5315: closeFinance()
5317: collectRentFinData()
5368: renderFinance()
5426: openFinCardDetail()
5633: openFinExtrato()
5727: renderFinExtratoView()
5808: openFinExtratoReport()
5825: renderFinGrafico()
5845: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
5847: okEmail()
5849: openEmailCompose()
5870: closeEmailCompose()
5871: sendEmailCompose()
5886: emailRecibo()
5891: emailIA()
5899: **RELATÓRIO DO FINANCEIRO**
5901: finFiltersText()
5906: finPeriodText()
5913: buildReportHtml()
5935: openFinReport()
5945: closeFinReport()
5946: printFinReport()
5950: shareFinReport()
5960: emailFinReport()
5966: **DESPESAS DO VEÍCULO**
5968: openExpenses()
5980: closeExpenses()
5981: fillExpenseTypes()
5986: createExpenseType()
6001: aiReadExpense()
6033: renderExpenses()
6055: saveExpense()
6082: deleteExpense()
6107: photoCard()
6136: inspectionHtml()
6162: hydrateImages()
6168: openInspection()
6176: closeInspection()
6180: renderInspectionModal()
6187: uploadInspection()
6218: deleteInspectionPhoto()
6238: fmtDue()
6244: nextDueLocal()
6255: openNewPix()
6285: **CAUÇÃO DO MOTORISTA**
6286: cauOf()
6287: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6288: devOf()
6289: devCobrancas()
6291: devPrevisao()
6299: dfDevRender()
6326: dfDevIr()
6327: dfDevSalvar()
6332: dfDevAvisar()
6338: dfDevDesfazer()
6342: dfDevReceber()
6351: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6355: cauPlano()
6363: cauParcela()
6370: cauParcelasTexto()
6374: cauNext()
6381: dfCauFill()
6391: dfCauCalc()
6419: dfCauRead()
6432: expTypeName()
6436: driverFinVehicleId()
6448: cauEntradaItem()
6462: cauPagoDespesaItem()
6477: **CAUÇÃO: quanto já foi pago**
6479: cauStatus()
6489: obsResumoHtml()
6490: cauResumoHtml()
6495: **MULTAS E OUTRAS DESPESAS**
6496: multasOf()
6498: multaPagaAuto()
6503: multasAbertas()
6504: multasPendentes()
6505: multasResumoHtml()
6513: cobOf()
6514: dfCobFill()
6520: dfCobRead()
6523: dfCobInfo()
6533: cobResumoHtml()
6537: ajustesOf()
6541: ajusteVale()
6542: isoDia()
6544: vencProxima()
6545: previsaoProxima()
6559: previsaoHtml()
6563: dfAjRender()
6569: addAjuste()
6578: delAjuste()
6583: abrirAjustes()
6584: renderProxCobrancas()
6590: savePixExtra()
6598: dfMultFill()
6606: fdPaga()
6607: dfMultRender()
6616: toggleMultas()
6623: addMulta()
6633: delMulta()
6641: multaPaga()
6650: renderDriverExtras()
6678: mondayAfter()
6686: renderDriverProfileExtras()
6752: semanaDoPix()
6758: **MEUS RECIBOS (área do motorista)**
6760: meusRecibosLista()
6764: reciboRowHtml()
6772: renderEncerradoRecibos()
6777: openMeuReciboDireto()
6778: openMeusRecibos()
6785: closeMeusRecibos()
6786: reciboPdfHtml()
6797: verMeuRecibo()
6804: voltarMeusRecibos()
6805: pdfMeuRecibo()
6809: shareMeuRecibo()
6818: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
6819: editVehicleRent()
6836: nextParcel()
6842: fillNewPixValues()
6878: newPixParts()
6909: **PERÍODO E VENCIMENTO DA COBRANÇA**
6910: dataISO()
6911: dataDe()
6912: dataMais()
6913: dataBR()
6914: diasEntre()
6915: isoSP()
6916: pixPeriodo()
6923: pixDesc()
6924: pixDiasPeriodo()
6929: marcarAjustesPorVenc()
6934: pixDatasNovo()
6943: pixDatasMudou()
6954: pixAluguelProporcional()
6962: pixPeriodoInfo()
6975: pixAddLinha()
6982: pixLinhas()
6984: descSoma()
6994: calcNewPix()
7003: **RECIBO DE PAGAMENTO**
7007: receiptValue()
7008: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7009: atrasoDados()
7013: cobrarAtraso()
7030: allocatePix()
7049: reciboData()
7072: fmtDateTimeBR()
7073: reciboTexto()
7124: openRecibo()
7141: closeRecibo()
7142: **CORRIGIR RECIBO**
7144: corrigirLinhaHtml()
7154: openCorrigirRecibo()
7177: closeCorrigirRecibo()
7178: corrigirLer()
7184: corrigirSoma()
7191: salvarCorrigirRecibo()
7208: copyRecibo()
7213: reciboCanvas()
7230: reciboPdfBlob()
7248: shareReciboPdf()
7264: rotularTabelas()
7282: areaAberta()
7283: markAreas()
7293: closeAreas()
7297: toggleArea()
7305: dobraSalva()
7306: setDobra()
7311: toggleDobra()
7318: dobraTopo()
7325: renderMasterResumo()
7339: renderMasterTopo()
7361: loadIA()
7383: updateIABadge()
7388: loadIASetting()
7394: paintIASwitch()
7400: toggleIA()
7407: loadRobo()
7416: iaPrepararQr()
7421: paintRobo()
7450: pedirCodigoRobo()
7459: toggleRobo()
7474: iaTodosGerar()
7492: iaTodosCancelar()
7496: iaTodosConfirmar()
7510: loadIARules()
7515: iaAbrirPdf()
7521: renderIARules()
7525: saveIARules()
7530: addIARule()
7535: delIARule()
7539: openIA()
7554: closeIA()
7555: iaShow()
7556: iaPhone()
7561: renderIA()
7603: iaAprovar()
7612: iaPhone2()
7613: iaSend()
7644: iaMark()
7655: iaDelete()
7666: openPixArea()
7675: closePixArea()
7676: renderPixArea()
7720: openEditPix()
7749: deletePix()
7761: closeNewPix()
7763: saveNewPix()
7854: pushSupported()
7855: isIOS()
7856: isStandalone()
7857: b64ToBytes()
7863: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
7868: notifStatus()
7876: stepsList()
7880: notifHelpHtml()
7914: renderNotifModal()
7926: checkDriverNotifications()
7959: activateFromModal()
7972: refreshNotifButton()
7991: subscribePush()
8006: enableNotifications()
8026: closeDocViewer()
8034: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8046: allFeaturesOn()
8047: feat()
8048: loadDriverFeatures()
8055: saveDriverFeatures()
8060: drawFeatureToggles()
8075: setAllFeatures()
8086: applyDriverFeatures()
8101: **PIX: conferência do código e QR code desenhado no aparelho**
8102: crc16()
8110: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8112: pixTxt()
8113: pixCampo()
8114: pixGerarCodigo()
8124: pixAutoLigado()
8125: pixAutoMudou()
8130: gerarPixAuto()
8146: pixRecebedorCarregar()
8157: pixRecebedorGuardar()
8164: pixValid()
8170: renderPixQr()
8180: previewNewPixQr()
8190: **FOTO DO MOTORISTA (recortada da CNH)**
8191: photoPath()
8192: fileToCanvas()
8211: cropPhoto()
8225: savePhoto()
8230: photoBoxFrom()
8236: fillAvatar()
8247: fillAvatars()
8260: storedFile()
8267: photoFromCnh()
8279: **FOTO DO PERFIL ACOMPANHA A CNH**
8282: cnhStamp()
8283: photoFiles()
8291: avatarPath()
8296: syncCnhPhotos()
8320: pickImage()
8323: changeDriverPhoto()
8339: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8341: uploadTmp()
8348: clearTmp()
8353: aiReadFiles()
8359: okDateISO()
8361: noAccents()
8363: makeUsername()
8372: titleCase()
8373: syncNewDriverAccess()
8379: setNewDriverPhoto()
8384: pickNewDriverPhoto()
8388: resetNewDriverForm()
8396: newDriverDocChosen()
8430: anoCrlv()
8434: formatVehicleBrand()
8439: inferVehicleBrand()
8448: normalizeCrlvFields()
8467: applyCrlvFields()
8480: aiReadCrlv()
8494: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
8495: sendWelcomeEmail()
8501: showCredentials()
8512: demoAssistente()
8531: **PERGUNTAR À IA (ÁREA IA, só o master)**
8535: iaChatReset()
8536: iaNorm()
8537: iaAcha()
8543: iaVeicTxt()
8544: iaCamposVeic()
8545: iaDataOk()
8546: iaOpcoes()
8547: iaTodosMotoristas()
8551: iaFerramenta()
8646: renderIAChat()
8663: iaChatDica()
8664: iaChatEnviar()
8699: iaChatNota()
8700: iaCancelarCartao()
8701: iaConfirmarCartao()
8746: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
8747: syncAppFinState()
8756: renderAppEarnings()
8836: saveAppEarning()
8863: workDayISO()
8864: paintDayOff()
8873: renderDayOff()
8880: setDayOff()
8890: aiReadEarning()
8923: **DESPESAS DO APLICATIVO**
8925: appExpCustomTypes()
8926: fillAppExpTypes()
8933: onAppExpTypeChange()
8938: saveAppExpense()
8963: deleteAppExpense()
8972: deleteAppEarning()
9069: loadTermsAcceptances()
9081: termsOf()
9082: currentAcceptance()
9083: needsTermsAcceptance()
9086: fmtDateTime()
9089: termsPlainText()
9093: termsHash()
9101: openTermsGate()
9124: termsGateCheck()
9132: acceptTerms()
9152: acceptanceHtml()
9163: openTermsViewer()
9181: closeTerms()
9187: downloadTermsCopy()
9208: termsBadgeMaster()
9215: termsMasterDetail()
9256: renderTermsSetupBanner()
9269: copyTermsSql()
9279: cnhExpired()
9280: cnhWaiting()
9281: onlyDigits()
9282: normName()
9284: verifyCnh()
9296: renderCnhBanner()
9314: sendNewCnh()
9362: cnhBadgeMaster()
9370: applyPendingCnh()
9378: autoReadNewCnhs()
9396: cnhPendingHtml()
9410: recheckPendingCnh()
9420: rejectPendingCnh()
9430: showContractDoc()
9493: contractPeriodLabel()
9494: contractStatusBadge()
9498: pdfSafeText()
9510: contractPdfFileName()
9519: buildDefaultClauses()
9566: generateContractPdfBytes()
9585: drawHeader()
9590: newPage()
9597: ensureSpace()
9600: wrapLines()
9624: drawJustifiedLine()
9737: renderContractsTab()
9790: renderDriverRentalContractsBox()
9823: openContractForDriver()
9830: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
9832: closeContractWizard()
9833: cwPopulateSelects()
9841: cwPopulateLocadores()
9853: cwOnLocadorChange()
9862: cwFillLocador()
9869: cwFillDriver()
9885: cwUpdateCrlvBar()
9894: cwNeedsCrlvFill()
9898: cwRefreshMissingBoxIfVisible()
9907: cwReadVehicleCrlv()
9956: cwReadCurrentVehicleCrlv()
9962: cwFillVehicle()
9984: cwOnDriverChange()
9992: cwOnVehicleChange()
10003: cwReadSnapshot()
10029: cwRenderClausesEditor()
10039: cwRebuildClauses()
10047: cwRenderPreview()
10076: cwTogglePreview()
10081: validateContractForEmission()
10098: openContractWizard()
10187: cwSyncSources()
10227: logContractHistory()
10236: persistContract()
10324: saveContractDraft()
10325: emitContract()
10327: ensureContractPdfBlob()
10337: downloadContractPdf()
10349: printContractPdf()
10362: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
10363: closeContractDetail()
10364: openContractDetail()
10433: saveContractSignatures()
10458: uploadSignedContractFile()
10478: terminateContractPrompt()
10493: cancelContractPrompt()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (367 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (443 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
